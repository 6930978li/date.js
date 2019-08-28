var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
};
//取数据的封装
kits.getLocalDataArray=function(key){
  let date=localStorage.getItem(key);
  let arr=JSON.parse(date);
  if(!arr){
    arr=[];
  }
  else{
    return arr;
  }

};
//存数据的封装
kits.saveLocalDataArray=function(key,arr){
  let json=JSON.stringify(arr);
  localStorage.setItem(key,json);


};
//新增数据
kits.appendDataIntoArray=function(key,data){
  let datas=localStorage.getItem(key);
  datas=JSON.parse(datas);
  datas = datas || [];
  datas.push(data);
  let json=JSON.stringify(datas)
  localStorage.setItem(datas,json);
};
//根据ID从数组中删除一条数据的参数
kits.deleteLocalDataById=function(key,id){
  let datas=localStorage.getItem(key);
  datas=JSON.parse(datas);
  datas = datas || [];
  datas.forEach(function(e,i){
    if(e.id===id){
      datas.splice(i,1);
    }
  });
  let json = JSON.stringify(datas);
   localStorage.setItem(key, json);
};
//根据ID修改本地存储中的指定数据的参数
kits.modifyLocalDataById=function(key,id,data){
  let arr=this.getLocalDataArray(key);
  let flag=false;
  arr.forEach(e,i=>{
    if(e.id==id){
      arr[i]=data;
      flag=true;
    }
  })
  this.saveLocalDataArray(key,arr);
  return flag;
}