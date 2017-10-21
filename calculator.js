window.onload = function(){
  Is_dot = [0];//没有小数点的数
  Is_dot_length = 1;
  count = 1; //计数
  leftBracket = 0;  //左括弧
  rightBracket = 0; //右括弧
  Is_Output = 0; //是否已经完成等号运算
  var content = document.getElementById('content');
  var inputBtn = document.getElementById("input-btn");
  inputBtn.onclick = function(input){ //鼠标点击
    var target=input.target;//鼠标点击的对象
    if(target.className == 'number-btn') InputNumber(target.innerText);
    else if(target.innerText == 'CE') clearAll();
    else if(target.innerText == '←') removeOne();
    else if(target.className == 'bracket') InputBracket(target.innerText);
    else if(target.innerText == '=') Equal();
    else InputOperator(target.innerText);
  }
}

function InputNumber(input){
  if(Is_Output == 1) clearAll();
  var content = document.getElementById('content');
  if(count >= 20){
    alert('Error:输入字符过多');
    return;
  }
  if(input === '.'){    //小数点专项
    if(content.innerText.slice(count - 1, count) == '+'
      || content.innerText.slice(count - 1, count) == '-'
      || content.innerText.slice(count - 1, count) == '×'
      || content.innerText.slice(count - 1, count) == '÷'
      || content.innerText.slice(count - 1, count) == '('
      || content.innerText.slice(count - 1, count) == ')')
    {
      alert('Error:小数点前需要数字');
      return;
    }
    if(content.innerText === '0'){
      content.innerText += input;
      Is_dot[Is_dot_length - 1] = 1;
      count++;
      return;
    }
    if(Is_dot[Is_dot_length - 1] == 1){
      alert('Error:小数点过多');
      return;
    }
    else {
      Is_dot[Is_dot_length - 1] = 1;
    }
  }
  if(content.innerText === '0') content.innerText = input;
  else {content.innerText += input; count++;}
}

function clearAll()
{
    var content = document.getElementById('content');
    content.innerText = '0';
    count = 1;
    leftBracket = 0;
    rightBracket = 0;
    Is_dot = [0];
    Is_dot_length = 1;
    Is_Output = 0;
}

function removeOne()
{
  if(Is_Output == 1) clearAll();
  var content = document.getElementById('content');
  if(count == 1){
    content.innerText = '0';
    return;
  }
  else {
    if(content.innerText.slice(count - 1, count) == '+')  {Is_dot_length--;}
    if(content.innerText.slice(count - 1, count) == '-')  {Is_dot_length--;}
    if(content.innerText.slice(count - 1, count) == '×')  {Is_dot_length--;}
    if(content.innerText.slice(count - 1, count) == '÷')  {Is_dot_length--;}
    if(content.innerText.slice(count - 1, count) == '.')  {Is_dot[Is_dot_length - 1] = 0;}
    content.innerText = content.innerText.slice(0, count - 1);
    count--;
  }
}

function InputBracket(input)
{
  if(Is_Output == 1) clearAll();
  var content = document.getElementById('content');
  if(input == ')'){
    if(content.innerText.slice(count - 1, count) == '+'
      || content.innerText.slice(count - 1, count) == '-'
      || content.innerText.slice(count - 1, count) == '×'
      || content.innerText.slice(count - 1, count) == '÷'
      || content.innerText.slice(count - 1, count) == '('
      || content.innerText.slice(count - 1, count) == '.')
    {
      alert('Error:错误的输入位置');
      return;
    }
    if(leftBracket <= rightBracket){
      alert('Error:没有对应的左括弧');
      return;
    }
    else rightBracket++;
  }
  if(input == '(') {
    if(content.innerText === '0') {
      content.innerText = input;
      leftBracket++;
      return;
    }
    if(content.innerText.slice(count - 1, count) != '+'
      && content.innerText.slice(count - 1, count) != '-'
      && content.innerText.slice(count - 1, count) != '×'
      && content.innerText.slice(count - 1, count) != '÷'
      && content.innerText.slice(count - 1, count) != '('
      && content.innerText.slice(conut - 1, count) == '.')
    {
      alert('Error:错误的输入位置');
      return;
    }
    leftBracket++;
  }

  content.innerText += input;
  count++;
}

function Equal(){
  var content = document.getElementById('content');
  var text = content.innerText;
  if(text == 'MATH ERROR' || text == 'Infinity') { clearAll(); return; }
  text = text.replace(/×/g, '*'); //将×替换成*; g:全局替换
  text = text.replace(/÷/g, '/');
  var result;
  try{
    result = eval(text) + ''; //转为字符串
    clearAll();
    count = result.length;
    if(result.search(/\./) > 0) {
      Is_dot = [1];
      if(result.split('.')[1].length > 16){   //小数点后的精度为16
        result = (+result).toFixed(16); // (+result) 为 result的 number形式
                                       // 相当于 ( 0 + result )
      }
    }
    else Is_dot = [0];
    Is_dot_length = 1;
    Is_Output = 1;
    result = eval(result);
    content.innerText = result;
  }
  catch(anything){
    content.innerText = "MATH ERROR";
    Is_Output = 1;
  }
}

function InputOperator(input){
  Is_Output = 0;
  var content = document.getElementById('content');
  if(content.innerText.slice(count - 1, count) == '+'
    || content.innerText.slice(count - 1, count) == '-'
    || content.innerText.slice(count - 1, count) == '×'
    || content.innerText.slice(count - 1, count) == '÷'
    || content.innerText.slice(count - 1, count) == '('
    || content.innerText.slice(count - 1, count) == '.')
  {
    alert('Error:错误的输入位置');
    return;
  }
  if(content.innerText == '0' && input == '-')  {
     content.innerText = input;
     return;
    }
  Is_dot_length++;
  content.innerText += input;
  count++;
}
