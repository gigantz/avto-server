import path from 'path';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import Users from 'models/Users';
import Subject from 'models/Subject';

import config from 'config';
import checkToken from '../middleware/checkToken';
import { sanitizedObject } from 'utils';

import Metrix from 'metrix';
import Mailer from 'utils/email';

export const addSubject = async (req, res) => {
  const { body: { title, body, categoryId }, user } = req;

  try {
    const author = await Users.findOne({ userId: user });

    try {
      const subject = await Subject.create({
        subjectId: uuid.v4(),
        author: author._id,
        authorId: author.userId,
        categoryId,
        title,
        body,
      });
  
      return res.json(subject);
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: error.message
      });
    }

  } catch (error) {
    return res.json({
      status: 500,
      message: 'user_not_found'
    });
  }
};

export const updateSubject = async (req, res) => {
  const { body: { subjectId, title, body, categoryId }, user: authorId } = req;

  try {
    const subject = await Subject.findOneAndUpdate(
    { authorId, subjectId },
    sanitizedObject({
      categoryId,
      title,
      body,
    }),
    {
      new: true
    });

    if(subject) {
      res.json(subject);
    } else {
      throw new Error(subjectId + ' is not found');
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: 'subject_not_found'
    });
  }
}

export const deleteSubject = async (req, res) => {
  const { body: { subjectId }, user: authorId } = req;
  
  try {
    const subject = await Subject.findOneAndRemove({ authorId, subjectId });
    
    if(subject) {
      res.json({
        message: 'subject_removed_successfully'
      });
    } else {
      res.json({
        message: 'subject_already_removed'
      });
    }
  } catch ({ message }) {
    res.json({
      status: 500,
      message
    })
  }
}

export const likeSubject = async (req, res) => {
  const { body: { subjectId }, user: userId } = req;

  try {
    let subject = await Subject.findOneAndUpdate(
      { subjectId,
        subscribers: {
          $not: {
            $elemMatch: { userId }
          }
       }
      },
      {
        $inc: { likes: 1 },
        $addToSet: { subscribers: { userId } }
      },
      { new: true }
    )

    if(subject) {
      res.json(subject);
    } else {
      subject = await Subject.findOneAndUpdate(
        { subjectId,
          subscribers: {
            $elemMatch: { userId }
         }
        },
        {
          $inc: { likes: -1 },
          $pull: { subscribers: { userId } }
        },
        { new: true }
      )

      res.json(subject);
    }
  } catch ({ message }) {
    res.json({
      status: 500,
      message
    })
  }
}

export default {
  addSubject,
  updateSubject,
  deleteSubject,
  likeSubject,
};