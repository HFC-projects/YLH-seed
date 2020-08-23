import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    toJSON: { getters: true, virtuals: true },
  },
})
export class UserModel {

  @prop({ type: String, required: true, trim: true, index: true })
  username: string;

  @prop({ type: String, required: true, trim: true})
  password: string;

  @prop({ type: Date, default: Date.now , required:false})
  createTime?: Date;

  @prop({ type: Date, default: Date.now , required: false})
  updateTime?: Date;
}
