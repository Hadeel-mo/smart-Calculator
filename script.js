 // يقوم بجلب البيانات القديمة فور فتح الحاسبة
    let historylist = JSON.parse(localStorage.getItem('mycalculatorhistory')) || [];

    // دالة التنبيه البصري
    const triggererror = () => {
        const display = document.getElementById('result');
        display.classList.add('error-glow'); // 1. إضافة الوميض أولاً
        setTimeout(() => {//تستخدم لتنفيذ الكود معين بعد مرور فترة زمنية
            display.classList.remove('error-glow'); // 2. حذفه بعد نصف ثانية
        }, 500);
    };

    // دالة الارقام والعمليات
    function appendToScreen(value) {
        const display = document.getElementById('result');
        const lastChar = display.value.slice(-1); // معرفة آخر شيء كُتب على الشاشة
        const operators = ['+', '-', '*', '/', '%']; // قائمة الممنوعات

        // منع إضافة نقطة ثانية إذا كان الرقم الحالي يحتوي على نقطة أصلاً
        if (value === '.') {
            let parts = display.value.split(/[+\-*/%]/);//منع البدء بها
            if (parts[parts.length - 1].includes('.')) return;// اذا كان نعم اذا موجودة يمنع اضافة رقمreturnهل الرقم الاخير يحتوي على نقطة includes('.')الوصول لاخر رقم 
        }

        // منع البدء بعملية حسابية إذا كانت الشاشة فارغة

        if (display.value === '' && operators.includes(value)) {
            triggererror();
            return;
        }

        // منع تكرار العمليات الحسابية خلف بعضها
        if (operators.includes(value) && operators.includes(lastChar)) {
            triggererror();
            return;
        }

        display.value += value; //+= خذ المكتوب وأضف إليه القيمة الجديدة
    }

    // دالة المسح بالكامل
    function clearScreen() {
        document.getElementById('result').value = '';
    }

    // دالة الحساب وحفظ السجل
    function calculate() {
        let display = document.getElementById('result');
        //tryوcatch Errorمعالجة الاخطاء اذا كتب المستخدم عملية غير منطقية يطلع 
        try {
            if (display.value === "") return;
            
            let result = eval(display.value); // عقل الآلة الحاسبة
            
            // حفظ العملية والنتيجة في المصفوفة
            historylist.push(display.value + "=" + result);
            // حفظ في الذاكرة المحلية لضمان بقاء البيانات بعد التحديث
            localStorage.setItem('mycalculatorhistory', JSON.stringify(historylist));

            
            display.value = result;
        } catch (error) {
            display.value = 'Error';
            triggererror(); // تنبيه عند وجود خطأ في المعادلة
        }
    }

    // دالة عرض وإخفاء السجل
  
function showhistory() {
    let panel = document.getElementById('historyPanel');
    let content = document.getElementById('historyContent');

    // تبديل كلاس active لتفعيل التأثير
    panel.classList.toggle('active');

    if (panel.classList.contains('active')) {//هل الوحة مفتوحة الان
        //اذا هي مفتوحة يقوم بالاتي
        if (historylist.length === 0) {//  اذا كان طول المصفوفة 0 يقوم بكتاب نص لا يوجد محفوظات<
            content.innerHTML = "<p style='color:white; text-align:center; margin-top:20px;'>لا يوجد محفوظات</p>";
        } else {
            content.innerHTML = historylist.map(item => {//بالمرور على كل عملية حسابية مخزنة فالذاكرةhistorylist.map(item =>حالة وجود عمليات اخرى تقوم
                let parts = item.split("=");
                return `<div style="border-bottom: 1px solid #252545; padding:12px 0;">

                            <div style="color: #94a3b8; font-size: 0.9em;">${parts[0]}</div>
                            <div style="color: #2ecc71; font-weight:bold; font-size: 1.1em;">=${parts[1]}</div>
                        </div>`;
            }).join('');//فالنهاية يتم دمج العمليات وتحويلها الى نص واحد طويل
        }
    }
}

           

    // دالة مسح السجل نهائياً
    function clearHistory() {
        historylist = []; // تصفير المصفوفة
        localStorage.removeItem('mycalculatorhistory'); // حذف من ذاكرة المتصفح
        document.getElementById('historyContent').innerHTML = "<p style='color:white; text-align:center'>السجل فارغ</p>";
    }

    // دالة الحذف (رقم رقم)
    function backspace() {
        let display = document.getElementById('result');
        display.value = display.value.slice(0, -1);
    }
 //الاستماع لاي ضغطة زر على لوحة المفاتيح
 document.addEventListener('keydown',
    function(event){
        const key=event.key;//الحصول على اسم المفتاح الذي ضغطتة
//اذا كان المفتاح رقما او اي عملية حسابية
        if((key>='0' && key<='9') || ['+','-','*','/','.','%'].includes(key)){
            appendToScreen(key);
        }
        else if(key=== 'Enter'){
            calculate();
        }
        else if (key=== 'Backspace'){
            backspace();
        }
else if(key==='Escape'){
    clearScreen();
}
    }
   );
     // دالة اظهار واخفاء اللوحة
     function togglepanel(){
        let panel=document.getElementById('advancedPanel');
        if(panel.style.display==="none")//cssفي display يقوم بفحص ال
    {
        panel.style.display="grid";//تظهر الوحة بشكل مرتب
    }else{
        panel.style.display="none";//اذا كانت ظاهرة قم بخفائها
    }
    }
     // دالة الجذر التربيعي
     function calculateSqrt(){
        let display=document.getElementById('result');
        display.value=Math.sqrt(eval(display.value));
    }
    //دالة التربيع
    function calculatePower(){
        let display=document.getElementById('result');
        display.value=Math.pow(eval(display.value),2);
    }
    //دالة تان
    function calculateTan(){
        let display=document.getElementById('result');
        let degree=eval(display.value);
        display.value=Math.tan(degree*Math.PI/180).toFixed(4);
    }
    //دالة sinبالراديان
    function calculateSin(){
        let display=document.getElementById('result');
        let degree=eval(display.value);
        display.value=Math.sin(degree*Math.PI/180).toFixed(4);//toFixedتظهر الارقام بطريقة عشرية
    }
    //دالة cosبالراديان
    function calculateCos(){
        let display=document.getElementById('result');
        let degree=eval(display.value);
        display.value=Math.cos(degree*Math.PI/180).toFixed(4);
    }
     //دالة باي
   function appendpi(){
    let display=document.getElementById('result');
    display.value=Math.PI.toFixed(5);
   }

   //دالة الاقواس
  
   let bracketopen=false;//هل القوس مفتوح ام مغلق

   function handlebrackets(){
    const result=document.getElementById('result');
    if(!bracketopen){//اذا كان مغلق يفتح واحد جديد
        result.value+='(';
        bracketopen=true;
    }else{
        result.value+=')';
        bracketopen=false;
    }
   }
