import _ from "lodash";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import defaultImage from "../../assets/image/defaultImg.png";

const Wrapper = styled.div`
  margin-bottom: 14px;
  .img_holder {
    width: 100px;
    height: 100px;
    /* border: 1px solid black; */
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const AvatarHolder = (props) => {
  useEffect(() => {
    uploadedImage.current.src = _.get(props, "image", defaultImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        props.onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none",
          }}
        />
        <div
          className="img_holder"
          onClick={() => imageUploader.current.click()}
        >
          <img ref={uploadedImage} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};
export default AvatarHolder;
