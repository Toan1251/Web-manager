import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './ProjectSlice';
import { dependenciesReducer } from './DependencySlice';
import { urlReducer } from './UrlSlice';


export const store = configureStore({
  reducer: {
    project: projectReducer,
    dependencies: dependenciesReducer,
    url: urlReducer
  },
});
