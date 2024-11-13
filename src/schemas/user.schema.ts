import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from './task.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
    default: [],
  })
  tasks: Array<Task>;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
