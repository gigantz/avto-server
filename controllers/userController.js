import path from 'path';
import Users from 'models/Users';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import { sanitizedObject } from 'utils';
import { Error } from 'mongoose';
import sharp from 'sharp';

export const updateUser = async (req, res, next) => {
  const userId = req.user;
  const {
    email,
    phone,
    firstname,
    lastname,
    countryCode,
    aboutme,
    autoId,
    picture,
    autoPhoto
  } = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { userId },
      sanitizedObject({
        email,
        phone,
        firstname,
        lastname,
        countryCode,
        aboutme,
        autoId,
        picture,
        autoPhoto
      }),
      { runValidators: true, context: 'query' }
    );
    const token = jwt.sign({ userId: userId }, config.SECRET);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.json({ status: 400, message: error.message || 'not found' });
  }

};

export const uploadFile = async (req, res) => {
  const { uploadType } = req.body;
  const random = String(Math.random()).substr(2);

  if (req.files.carphoto) {
    const { carphoto } = req.files;
    const [_, ext] = carphoto.mimetype.split('/');

    sharp(carphoto.data)
      .resize(800)
      .toFile(path.resolve(`./files/users/myauto/${req.user}_myauto_${random}.${ext}`));

    sharp(carphoto.data)
      .resize(180, 180)
      .toFile(path.resolve(`./files/users/myauto/thumbs/${req.user}_myauto_${random}.${ext}`));

    try {

      const user = await Users.findOneAndUpdate({ userId: req.user }, { autoPhoto: `${req.user}_myauto_${random}.${ext}` });
      res.json({
        status: 200,
        photo: `${req.user}_myauto_${random}.${ext}`
      });

    } catch (error) {

      res.json({
        status: 500,
        message: 'upload_photo_error'
      });

    }
  } else if (req.files.profilePhoto) {
    const { profilePhoto } = req.files;
    const [_, ext] = profilePhoto.mimetype.split('/');

    sharp(profilePhoto.data)
      .toFile(path.resolve(`./files/users/profile/${req.user}_profile_${random}.${ext}`));

    try {

      const user = await Users.findOneAndUpdate({ userId: req.user }, { picture: `${req.user}_profile_${random}.${ext}` });
      res.json({
        status: 200,
        photo: `${req.user}_profile_${random}.${ext}`
      });

    } catch (error) {

      res.json({
        status: 500,
        message: 'upload_photo_error'
      });

    }
  } else {

    res.json({ status: 500, message: 'no_photo'}).end();

  }
};

export default {
  updateUser,
}