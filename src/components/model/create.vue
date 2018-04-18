<template>
  <el-row v-loading='loading'>
    <el-col :span='24'>
      <el-form ref='form' :model='form' label-width='80px' :rules='rules'>

        <el-form-item label="Model" prop='model'>
          <el-select size='small' v-model="form.model" placeholder="please select Model">
            <el-option label="yun" value="yun"></el-option>
            <el-option label="iot" value="iot"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type" prop='type'>
          <el-select size='small' v-model="form.type" placeholder="please select Type">
            <el-option label="gateway" value="gateway"></el-option>
            <el-option label="thing" value="thing"></el-option>
            <el-option label="iot" value="iot"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Platform" prop='platform'>
          <el-select size='small' v-model="form.platform" placeholder="please select Platform">
            <el-option label="ls1043ardb-1" value="ls1043ardb-1"></el-option>
            <el-option label="ls1046a" value="ls1046a"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Vendor" prop='vendor'>
          <el-select size='small' v-model="form.vendor" placeholder="please select Vendor">
            <el-option label="nxp" value="nxp"></el-option>
            <el-option label="freescalse" value="freescalse"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class='opr-btn'>
          <el-button size='small' @click="$router.go(-1)"><i class="el-icon-d-arrow-left"></i> Cancel</el-button>
          <el-button type='primary' size='small' @click="submitForm('form')">Submit <i class="el-icon-d-arrow-right"></i></el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import { createModel } from '@/api/api.js'

  let thisVue = null

  export default {
    data(){
      return {
        form: {
          model: '',
          type: '',
          platform: '',
          vendor: '',
        },
        loading: false,
        rules: {
          mode: [
            { required: true, message: 'Please input Mode', trigger: 'blur' },
          ],
          type: [
            { required: true, message: 'Please input Type', trigger: 'blur' },
          ],
          platform: [
            { required: true, message: 'Please input Platform', trigger: 'blur' },
          ],
          vendor: [
            { required: true, message: 'Please input Vendor', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        thisVue.$refs[formName].validate((valid) => {
          if(valid){
            thisVue.loading = true
            createModel(thisVue.form).then(json => {
              thisVue.loading = false
              if(json.data.status == 'success')
              {
                thisVue.$message({type: 'success',message: 'create model successfully'});
                thisVue.$router.push('/model_list');
              }
              else{
                thisVue.$message.error(json.data.message);
              }
            })
            .catch(error => {
              thisVue.loading = false
              return false
            })
          }
          else{
            return false;
          }
        })
      }
    },
    mounted () {
      thisVue = this
    }
  }
</script>
<style>
  @import '../../assets/style/create.css'
</style>