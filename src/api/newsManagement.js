import axios from "../app/axios";
import { NewsManagementAPIpath } from "../constant/api";
//search news
export const searchNews = async (params) => {
  try {
    const res = await axios.get(NewsManagementAPIpath.searchNews, {
      params: params,
    });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};

// export function dataURLtoFile(dataurl, filename) {
//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, {
//     type: mime,
//   });
// }

//add new news
export const addNewNews = async (data, file) => {
  try {
    // let imageFile = dataURLtoFile(file, "file");
    const fileUpload = new FormData();
    fileUpload.append("title", data.title);
    fileUpload.append("shortContent ", data.shortContent);
    fileUpload.append("isPublic ", data.isPublic);
    fileUpload.append("content  ", data.content);
    // fileUpload.append("file", imageFile);
    fileUpload.append("file", file);

    const res = await axios.post(NewsManagementAPIpath.addNewNews, fileUpload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//get news detail
export const getNewsDetail = async (id) => {
  try {
    const res = await axios.get(NewsManagementAPIpath.getNewsDetail + "/" + id);
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//edit news
export const editNews = async (data, file, isChangeImage) => {
  try {
    const fileUpload = new FormData();
    fileUpload.append("id", data.news_id);
    fileUpload.append("title", data.title);
    fileUpload.append("shortContent", data.short_content);
    fileUpload.append("isPublic", data.is_public);
    fileUpload.append("content", data.content);
    if (isChangeImage) {
      // let imageFile = dataURLtoFile(file, "file");
      // fileUpload.append("file", imageFile);
      fileUpload.append("file", file);

    }

    const res = await axios.put(NewsManagementAPIpath.editNews, fileUpload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//delete news
export const deleteNews = async (id) => {
  try {
    const res = await axios.delete(NewsManagementAPIpath.deleteNews + "/" + id);
    if (res.status === 200) return res;
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
