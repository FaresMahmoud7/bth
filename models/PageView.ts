import mongoose from "mongoose";

const pageViewSchema = new mongoose.Schema({
  path: { type: String, default: "/" },
  createdAt: { type: Date, default: Date.now },
});

const PageView =
  mongoose.models.PageView || mongoose.model("PageView", pageViewSchema);

export default PageView;
