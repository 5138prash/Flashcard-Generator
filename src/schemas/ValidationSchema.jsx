// schemas/validationSchema.jsx
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Group title is required')
    .min(4, 'Group title must be at least 4 characters')
    .max(21, 'Group title must not be more than 21 characters'),
  
  description: Yup.string()
    .required('Group description is required')
    .min(20, 'Group description must be at least 20 characters')
    .max(100, 'Group description must not be more than 100 characters'),
  
  uploadImage: Yup.mixed().required('Please upload an image'),
  
  termCards: Yup.array().of(
    Yup.object().shape({
      term: Yup.string()
        .required('Term is required')
        .min(4, 'Term must be at least 4 characters'),
      
      definition: Yup.string()
        .required('Definition is required')
        .min(10, 'Definition must be at least 10 characters')
        .max(300, "Definition must not be more than 300 characters"),
      
      image: Yup.mixed().required('Please upload an image'),
    })
  ),
});

export default ValidationSchema;
