
<template>
  <div>
    <div class="form1" style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #f0dddd; border-radius: 10px;">
      <ValidationObserver ref="Observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider name="First Name" :rules="{ required: true }" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">First Name</label>
            <b-form-input type="text" v-model="formValues.fname" class="form-field" :state="getValidationState(validationContext)"/>
            <span class="error-message">{{  validationContext.errors[0] }}</span>
          </ValidationProvider>
    
          <ValidationProvider name="Last Name" rules="required|alpha_spaces" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">Last Name</label>
            <b-form-input type="text" v-model="formValues.lname" class="form-field" :state="getValidationState(validationContext)"/>
            <span class="error-message">{{ validationContext.errors[0]  }}</span>
          </ValidationProvider>
    
          <ValidationProvider name="Age" rules="required|numeric" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">Age</label>
            <b-form-input type="text" v-model="formValues.age" class="form-field" :state="getValidationState(validationContext)"/>
            <span class="error-message">{{ validationContext.errors[0] }}</span>
          </ValidationProvider>
    
          <ValidationProvider name="About" rules="required|max:100" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">About me</label>
            <textarea v-model="formValues.profile" class="form-field" :state="getValidationState(validationContext)"></textarea>
            <span class="error-message">{{ validationContext.errors[0]  }}</span>
          </ValidationProvider>
    
          <ValidationProvider name="Degree" rules="required" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">Your Degree</label>
            <select v-model="formValues.degree" class="form-field" :state="getValidationState(validationContext)">
              <option value="" disabled>Select your degree</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.Com">B.Com</option>
              <option value="B.A">B.A</option>
            </select>
            <span class="error-message">{{ validationContext.errors[0]  }}</span>
          </ValidationProvider>
    
          <ValidationProvider name="Cities" rules="required" v-slot="validationContext">
            <label style="display: block; margin-bottom: 5px;">Cities</label>
            <select multiple v-model="formValues.cities" class="form-field" :state="getValidationState(validationContext)">
              <option value="Kolkata">Kolkata</option>
              <option value="Dubai">Dubai</option>
              <option value="Delhi">Delhi</option>
            </select>
            <span class="error-message">{{validationContext.errors[0]  }}</span>
          </ValidationProvider>
    
          <div style="display: flex; align-items: center; justify-content: center;">
            <input type="checkbox" id="remoteWork" name="remoteWork" v-model="formValues.remoteWork" true-value="Yes" false-value="No" style="width:80%;" /><label>Work Remotely</label>
          </div><br><br>
    
          <button type="submit" class="form-button">Submit</button>
        </b-form>
      </ValidationObserver>
  </div>
        
  <div style="text-align: center;">
  
    <h2>Submitted Form Data:</h2>
  
    <table style="border-collapse: collapse; width: 80%; margin: 0 auto; border: 1px solid black;">
      <thead style="border: 1px solid ; background-color: rgb(197, 193, 193);">
        <th style="border: 1px solid; padding: 8px;">First Name</th>
        <th style="border: 1px solid; padding: 8px;">Last Name</th>
        <th style="border: 1px solid; padding: 8px;">About Me</th>
        <th style="border: 1px solid; padding: 8px;">Age</th>
        <th style="border: 1px solid; padding: 8px;">Degree</th>
        <th style="border: 1px solid; padding: 8px;">Fav Cities</th>
        <th style="border: 1px solid; padding: 8px;">Remote Job</th>
      </thead>
      <tbody style="border: 1px solid;">
        <tr v-for="(formData, i) in submittedFormData" :key="i" style="border: 1px solid;">
          <td style="border: 1px solid; padding: 8px;">{{ formData.fname }}</td>
          <td style="border: 1px solid; padding: 8px;">{{ formData.lname }}</td>
          <td style="border: 1px solid; padding: 8px;">{{ formData.profile }}</td>
          <td style="border: 1px solid; padding: 8px;">{{ formData.age }}</td>
          <td style="border: 1px solid; padding: 8px;">{{ formData.degree }}</td>
          <td style="border: 1px solid; padding: 8px;">
            <span v-for="(city, index) in formData.cities" :key="index">
              {{ city }}
              <br>
            </span>
          </td>
          <td style="border: 1px solid; padding: 8px;">{{ formData.remoteWork }}</td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
  </template>
  
  <script>
  
  
  export default{
   
    data(){
      return {
        // manage the form data
        formValues:{
          fname:'',
          lname:'',
          age:'',
          profile:'',
          degree:'',
          remoteWork:'No',
          cities:[],
      
        },
        // array to store the form data
        submittedFormData: [],
        
      }
    },
    methods:{
   
        getValidationState ({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
          },
  
        // error message 
        customErrorMessages: {
        fname: 'First Name is required field',
        lname: 'Last Name is required field',
        age: 'Age is required and must be numeric',
        profile: 'About Me is required and should not exceed 100 characters',
        degree: 'Your Degree is required',
        cities: 'At least one city must be selected',
        remoteWork: 'Work Remotely is required',
        // Add other field messages as needed
      },
  
       // submit from action 
          onSubmit() {
            console.log(this.formValues)
            // console.log(errors);
            this.submittedFormData.push({ ...this.formValues });
            console.log("Form Data revieved: ",this.submittedFormData);
      // Clear the form fields
          this.formValues.fname = '';
          this.formValues.lname = '';
          this.formValues.age = '';
          this.formValues.profile = '';
          this.formValues.degree = '';
          this.formValues.remoteWork = 'No';
          this.formValues.cities = [];
  
          // Reset the validation state
          this.$refs.Observer.reset();
            
          },
      
    },
  }
  </script>
  <style>
  
  .form1{
    background-color: grey;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    border-radius: 1rem;
  }
  .form-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .error-message {
    color: rgb(153, 13, 13);
    font-size: 12px;
  }
  
  .form-button {
    background-color: green;
    color: wheat;
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
  button{
    margin: '0 auto';
  }
  </style>
