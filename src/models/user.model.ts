import bcrypt from "bcrypt";
import { Document, model, Model, Schema, Types } from "mongoose";

// Interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

// Schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true, versionKey: false }
);

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static methods
interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

// Login
UserSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Incorrect email");
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw new Error("Incorrect password");
  return user;
};

// To JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model<IUser, IUserModel>("User", UserSchema);
