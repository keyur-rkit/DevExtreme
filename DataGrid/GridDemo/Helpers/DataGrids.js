import { GetFeedConfig } from "../DataGrid/FeedConfig.js";
import { GetMyPostsConfig } from "../DataGrid/MyPostsConfig.js";
import { GetProfileConfig } from "../DataGrid/ProfileConfig.js";
import { GetUsersConfig } from "../DataGrid/UsersConfig.js";

var gridTypes = [
  {
    id: 1,
    name: "Profile",
    config: GetProfileConfig,
  },
  {
    id: 2,
    name: "My Posts",
    config: GetMyPostsConfig,
  },
  {
    id: 3,
    name: "Feed",
    config: GetFeedConfig,
  },
  {
    id: 4,
    name: "Users",
    config: GetUsersConfig,
  },
];

export { gridTypes };
