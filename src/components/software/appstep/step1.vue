<template>
  <el-row v-loading='loading'>
    <el-col :span='24'>
      <el-form ref='form' :model='form' label-width='160px' :rules='rules'>
        <el-col :span='24'>
          <el-form-item label="Docker Name" prop='name'>
            <el-input size='small' placeholder='please input Docker Name' v-model='form.name'></el-input>
          </el-form-item>
          <el-form-item label="App Display Name" prop='display_name'>
            <el-input size='small' placeholder='please input App Display Name' v-model='form.display_name'></el-input>
          </el-form-item>
          <el-form-item label="Description" prop='description'>
            <el-input size='small' placeholder='please input description' v-model='form.description'></el-input>
          </el-form-item>
          <el-form-item label="Vendor" prop='vendor_id'>
            <el-select size='small' v-model="form.vendor_id" placeholder="please select Vendor">
              <template v-for='item of vendors'>
                <el-option :label="item.name" :value="item.id" :key='item.id'></el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="Upload App Icon" prop='icon'>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">pull files here，or <em>click to choose files</em></div>
              <div class="el-upload__tip" slot="tip">Only JPG/PNG files can be uploaded with no more than 500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span='24' class='opr-btn'>
          <el-form-item>
            <el-button size='small' type='primary' @click="next('form')">Next <i class="el-icon-d-arrow-right"></i></el-button>
          </el-form-item>
        </el-col>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>

  import { getVendorList } from '@/api/api.js'

  let thisVue = null

  export default {
    props: ['totalDat'],
    data(){
      return {
        form: {
          name: '',
          display_name: '',
          description: '',
          vendor_id: '',
        },
        vendors: [],
        loading: true,
        rules: {
          name: [
            { required: true, message: 'Please input Mode', trigger: 'blur' },
          ],
          display_name: [
            { required: true, message: 'Please input Type', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Please input Platform', trigger: 'blur' },
          ],
          vendor_id: [
            { required: true, message: 'Please select Vendor', trigger: 'change' },
          ]
        }
      }
    },
    methods: {
      next (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$emit('step1', {active: 2, curComponent: 'step2', form_dat: thisVue.form});
          }
          else{
            return false;
          }
        })
      },
      getVendor () {
        getVendorList().then(json => {
          thisVue.loading = false
          thisVue.vendors = json.data.vendors
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      },
      handleAvatarSuccess (res, file) {
        console.log(res, file);
      },
      beforeAvatarUpload (file) {
        console.log(file);
      }
    },
    mounted () {
      thisVue = this
      thisVue.getVendor()
      let {name, display_name, description, vendor_id} = thisVue.totalDat
      thisVue.form = {name, display_name, description, vendor_id}
    }
  }
</script>