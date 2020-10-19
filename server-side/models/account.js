const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// in here we are creating a schama for role of user, admin, selller
// In this program we are sing in as user, admin, seller
// here we are mainly authenticating these entries and we aare accoutverify tokens too
const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"],
      required: true,
    },
    accountVerifyToken: String,
    accountVerifyTokenExpiration: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
