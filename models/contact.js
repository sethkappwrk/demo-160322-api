import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    isActive: {
      type: Boolean,
      required: [true, "Active field is required"],
      default: false,
    },
  },
  { timestamps: true }
);

ContactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contacts", ContactSchema);

export default Contact;
