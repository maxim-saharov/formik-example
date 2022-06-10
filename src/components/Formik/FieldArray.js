//
import React from 'react';
import {Field, Form, Formik, FieldArray} from "formik";
import styles from "./FieldArray.module.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape( {

   fullName: Yup.string()
      .min( 2, "Must be longer than 2 characters !" )
      .max( 5, "Must be shorter than 5 characters !" )
      .required( "Required !" ),

} );

const FieldArrayList = () => {


   const elements = ['Fire', 'Air', 'Water'];

   let aaa = elements.join(', ')

   let objectFromApi = {
      fullName: 'aaa',
      aboutMe: '',
      contacts: {
         facebook: 5,
         website: null,
         instagram: "instagram.com/sds"
      }
   }


   const objectFromApiCopy = JSON.parse(JSON.stringify(objectFromApi))

   const arrayWithNames = Object.keys( objectFromApiCopy.contacts );

   arrayWithNames.forEach( (item) => {
      let value = objectFromApiCopy.contacts[item];
      if (value === null) {
         objectFromApiCopy.contacts[item] = '';
      }
   } )

   let contactsJsx = (name) => (
      <div key={name} className={styles.contact}>
         <div>
            <b>{name}</b>:
         </div>

         <div>
            <Field
               name={`contacts.${name}`}
               type={'text'}
               id={name}
               placeholder={name}
            />
         </div>
      </div>);


   return (
      <div>

         <div>
            < br />
         </div>

         <Formik
            initialValues={objectFromApiCopy}

            validationSchema={validationSchema}

            onSubmit={(values) => {

               console.log( values.contacts );
               console.log( values );

            }}
         >
            {(propsF) => {
               const {values, errors} = propsF;
               //console.log( values );
               return (


                  <Form>

                     <div>
                        <b>Contacts</b>:
                     </div>

                     <FieldArray
                        name="friends"
                        render={() => (
                           <div>
                              {arrayWithNames.map( name => contactsJsx( name ) )}
                           </div>
                        )}
                     />


                     <div>
                        < br />
                     </div>


                     <div>
                        <div>
                           <label htmlFor={'fullName'}>
                              label - Full name </label>
                        </div>

                        <Field
                           name={'fullName'}
                           type={'text'}
                           id={'fullName'}
                           placeholder={'Full name'}
                        />
                        <div>{errors.fullName}</div>
                     </div>


                     <div>
                        < br />
                     </div>


                     <div>
                        <Field
                           name={'aboutMe'}
                           as={'textarea'}
                           placeholder={'About me'}
                        />
                     </div>



                     <div>
                        < br />
                     </div>

                     <button type={'submit'}>Save</button>


                  </Form>
               )
            }}

         </Formik>


         <div>
            ...
         </div>

         <div>
            < br />
         </div>


      </div>)
}


export default FieldArrayList;

// formik-example
// initialValues={{
//    fullName: 'aaa',
//       aboutMe: '',
//       social: {
//       facebook: 'sss',
//          twitter: ''
//    },
//    phNumbers: ['', '222']
//
// }}

// {/*<div>*/}
// {/*   <Field*/}
// {/*      name={'phNumbers[0]'}*/}
// {/*      type={'text'}*/}
// {/*   />*/}
// {/*</div>*/}

// {/*<div>*/}
// {/*   <Field*/}
// {/*      name={'contacts.facebook'}*/}
// {/*      type={'text'}*/}
// {/*   />*/}
// {/*</div>*/}