import * as rtk from '@reduxjs/toolkit/dist/index.js';
const { createAction } = rtk.default ?? rtk;
export const chooseName = createAction('CHOOSE_NAME');
