import { Toast } from "./Utils.js";

/**
 * Sends a GET request.
 * @param {string} url - The URL.
 * @param {Object} [params={}] - Query parameters.
 * @param {Object} [headers={}] - Request headers.
 * @returns {jqXHR} The AJAX request object.
 */
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

/**
 * Sends a POST request.
 * @param {string} url - The URL.
 * @param {Object} data - Request data.
 * @returns {jqXHR} The AJAX request object.
 */
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

/**
 * Sends a PUT request.
 * @param {string} url - The URL.
 * @param {Object} data - Request data.
 * @returns {jqXHR} The AJAX request object.
 */
function PutReq(url, data) {
  return $.ajax({
    url: url,
    type: "PUT",
    data: data,
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

/**
 * Sends a DELETE request.
 * @param {string} url - The URL.
 * @returns {jqXHR} The AJAX request object.
 */
function DeleteReq(url) {
  return $.ajax({
    url: url,
    type: "DELETE",
  }).fail((e) => {
    Toast(e.responseJSON.message, "error");
  });
}

export { GetReq, PostReq, PutReq, DeleteReq };
