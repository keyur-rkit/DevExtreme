import { Toast } from "./Utils.js";

function GetReq(url, params = {}, headers = {}) {
  return $.ajax({
    url: url,
    method: "GET",
    data: params,
    headers: headers,
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

function PostReq(url, data) {
  return $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data: data,
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

function PutReq(url, data) {
  return $.ajax({
    url: url,
    type: "PUT",
    data: data,
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

function DeleteReq(url) {
  return $.ajax({
    url: url,
    type: "DELETE",
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

export { GetReq, PostReq, PutReq, DeleteReq };
