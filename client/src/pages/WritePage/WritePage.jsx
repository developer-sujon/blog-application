import { useState } from "react";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import FormValidation from "../../helper/FormValidation";
import GetBase64 from "../../helper/GetBase64";
import ToastMessage from "../../helper/ToastMessage";
import { setCategory } from "../../redux/features/categoriesSlice";
import { setTag } from "../../redux/features/tagsSlice";
import store from "../../redux/store/store";
import "./write.css";

const WritePage = () => {
  const navigate = useNavigate();

  const selectTagsList = useSelector((state) => state.tags.value);
  const selectCategoriesList = useSelector((state) => state.categories.value);

  let [tags, setTags] = useState([]);
  let [categories, setCategories] = useState([]);

  const selectTags = () => {
    ApiRequest.getRequest("/tag/selectAllTag").then((response) => {
      if (response.status === 200) {
        store.dispatch(setTag(response.data));
      }
    });
  };

  const selectCategories = () => {
    ApiRequest.getRequest("/category/selectAllCategory").then((response) => {
      if (response.status === 200) {
        store.dispatch(setCategory(response.data));
      }
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
    selectTags();
    selectCategories();
  }, []);

  let titleRef,
    bodyRef,
    imgInputRef,
    imgViewRef = useRef();

  const imgViewChange = () => {
    const file = imgInputRef.files[0];
    GetBase64(file).then((img) => {
      imgViewRef.src = img;
    });
  };

  const handleTagCheckboxChange = (event) => {
    var updatedList = [...tags];
    if (event.target.checked) {
      updatedList = [...tags, event.target.id];
    } else {
      updatedList.splice(tags.indexOf(event.target.id), 1);
    }
    setTags(updatedList);
  };

  const handleCategoryCheckboxChange = (event) => {
    var updatedList = [...categories];
    if (event.target.checked) {
      updatedList = [...categories, event.target.id];
    } else {
      updatedList.splice(categories.indexOf(event.target.id), 1);
    }
    setCategories(updatedList);
  };

  const createPost = (e) => {
    e.preventDefault();
    if (FormValidation.isEmpty(titleRef.value)) {
      ToastMessage.errorMessage("Tile is Require");
    } else if (FormValidation.isEmpty(bodyRef.value)) {
      ToastMessage.errorMessage("Description is Require");
    } else {
      const newPost = {
        title: titleRef.value,
        body: bodyRef.value,
        photo: imgViewRef.src,
        categories: categories.toString(),
        tags: categories.toString(),
      };

      ApiRequest.postRequest("/post/createPost", newPost).then((result) => {
        if (result) {
          ToastMessage.successMessage("Post Create Successfull");
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
        ref={(img) => (imgViewRef = img)}
      />
      <form className="writeForm" onSubmit={createPost}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            ref={(input) => (imgInputRef = input)}
            onChange={imgViewChange}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={(input) => (titleRef = input)}
          />
        </div>
        <div className="container">
          <h4>categories</h4>
          {selectCategoriesList &&
            selectCategoriesList.map((cat) => {
              return (
                <>
                  <div className="form-group form-check me-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={cat.categoryId}
                      onChange={handleCategoryCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={cat.categoryId}
                    >
                      {cat.name}
                    </label>
                  </div>
                </>
              );
            })}
        </div>
        <div className="container">
          <h4>tags</h4>
          {selectTagsList &&
            selectTagsList.map((tag) => {
              return (
                <>
                  <div className="form-group form-check me-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={tag.tagId}
                      onChange={handleTagCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={tag.tagId}>
                      {tag.name}
                    </label>
                  </div>
                </>
              );
            })}
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            ref={(input) => (bodyRef = input)}
          />
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePage;
