<template>
  <el-row class='login-box'>
    <el-col :span='24' class='tit-box'>
      <div class='tit-2'>EDGESCALE</div>
      <div class='tit-1'>System Control</div>
    </el-col>
    <el-col :span='24'>
      <el-card class='card-box register-card'>
        <div class="form-box">
          <el-form :model='form' ref='form' :rules='rules' label-width='120px'>
            <el-col :span='24' style='text-align:center;'><i class="iconfont tit-3 icon-usered"></i></el-col>

            <el-col :span='24'>
              <el-input size='small' placeholder='please input username' prefix-icon='iconfont icon-login' v-model='form.name'></el-input>
            </el-col>

            <el-col :span='24'>
              <el-input size='small' type='password' placeholder='please input password' prefix-icon='iconfont icon-wodemima' v-model='form.password'></el-input>
            </el-col>

            <el-col :span='24'>
              <el-input size='small' type='password' placeholder='ensure password' prefix-icon='iconfont icon-wodemima' v-model='form.passwordCheck'></el-input>
            </el-col>

            <el-col :span='24'>
              <el-input size='small' type='email' placeholder='ensure password' prefix-icon='iconfont icon-email-two' v-model='form.email'></el-input>
            </el-col>

            <el-col :span='24' style='text-align:center;'>
              <el-button size='small' class='submit-btn' type='primary' @click="submitForm('form')">Register</el-button>
            </el-col>

            <el-col :span='24' style='text-align: center;'>
              <el-button type='text' class='link-btn' @click="$router.push('/login')">An existing account? Login immediately</el-button>
            </el-col>
          </el-form>
        </div>
      </el-card>
    </el-col>
    <el-col :span='24' class='login-footer'>
      <p>© 2017. Copyright <span>edgescale.org</span> by <span>NXP</span></p>
    </el-col>
  </el-row>
</template>

<script>
  import { Register } from '@/api/api'

  export default {
    data(){
      return {
        form: {
          name: '',
          password: '',
          passwordCheck: '',
          email: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input username', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Push Button To Create DeviceNO', trigger: 'blur' },
          ],
          passwordCheck: [
            { required: true, message: 'Ensure your password', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Please input Email', trigger: 'blur' },
          ],
        }
        
      }
    },
    methods: {
      register(){
        let params = {user: this.form};
        Register(params).then(json=>{
          if(json.data.status == 'success')
          {
            this.$message({type: 'success', message: "register successfully, link to login"});
            this.$router.push('/login');
          }
          else
          {
            this.$message({type: 'error', message: json.data.message});
          }
        })
        .catch(error=>{
          console.log(error);
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.register();
          }
          else{
            return false;
          }
        })
      },
    },
    mounted(){
      let login_box = document.getElementsByClassName('login-box')[0];
      login_box.style.height = document.body.clientHeight + 'px';
    }
  }
</script>

<style scoped>
  @import '../../assets/style/admin.css'
</style>