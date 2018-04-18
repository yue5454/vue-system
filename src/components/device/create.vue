<template>
  <el-row v-loading='loading'>
    <el-col :span='24'>
      <el-form ref='form' :model='form' label-width='120px' :rules='rules'>

        <el-form-item label='Fuid' prop='fuid'>
          <el-col :span='18'>
            <el-input size='small' auto v-model='form.fuid'></el-input>
          </el-col>
          <el-col :span='6' style='text-align:right;'>
            <el-button size='small' type='primary' @click='c_generateDeviceNO(form.fuid)' :disabled='form.fuid == ""'>Generate Device ID NO <i class="el-icon-download"></i></el-button>
          </el-col>
        </el-form-item>
        <el-form-item label='Device No' prop='deviceNo'>
          <el-input size='small' v-model='form.deviceNo' :disabled='true'></el-input>
        </el-form-item>

        <el-form-item label="Model" prop='model'>
          <el-select size="small" v-model="form.mode" placeholder="please select Model">
            <el-option v-for='(item,key) in modelList' :key='key' :label="`${item.model}-${item.platform}-${item.type}-${item.vendor}`" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class='opr-btn'>
          <el-button size='small' type='primary' @click="submitForm('form')">Submit <i class="el-icon-d-arrow-right"></i></el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import { createDevice,generateDeviceNO,getModelList } from '@/api/api.js'

  export default {
    data(){
      return {
        form: {
          mode: '',
          fuid: '',
          deviceNo: '',
        },
        loading: true,
        modelList: [],
        rules: {
          fuid: [
            { required: true, message: 'Please input FUID', trigger: 'blur' },
          ],
          deviceNo: [
            { required: true, message: 'Push Button To Create DeviceNO', trigger: 'blur' },
          ],
          mode: [
            { required: true, message: 'Please select Mode', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            let params = {};
            params.device = {fuid: this.form.deviceNo, model_id: this.form.mode}
            this.loading = true;
            createDevice(params).then(json => {

              this.$message({type: 'success',message: 'create device successfully'});
              this.$router.push('/device_list');
            })
            .catch(error => {
              console.log(error);
            })
          }
          else{
            return false;
          }
        })
      },
      c_generateDeviceNO(id){
        this.loading = true;
        generateDeviceNO({fuid:id}).then(json=>{
          this.form.deviceNo = json.data;
          this.loading = false;

        }).catch(err=>{
          console.log(err);
        })
      },
      c_getModelList(){
        getModelList().then(json => {
          this.modelList = json.data.models;
          this.loading = false;
        }, err => {
          console.log(err);
        })
      },
    },
    mounted(){
      this.c_getModelList();
    }
  }
</script>

<style>
  @import '../../assets/style/create.css'
</style>