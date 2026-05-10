$(document).ready(function () {

    // مصفوفة لتخزين الوجبات المختارة
    let selectedMeals = [];

    // تفعيل التاريخ
    $(".datepicker").datepicker({
        format: "dd-mm-yyyy",
        i18n: {
            cancel: "إلغاء",
            clear: "مسح",
            done: "تم",
        },
    });

    // إظهار / إخفاء التفاصيل
    $(".details-btn").click(function () {
        $(this).closest("tr").next(".details-row").toggle();
    });

    // اختيار الوجبة
    $(".select-btn").click(function () {
        let row = $(this).closest("tr");

        let name = row.find("td:nth-child(4)").text();
        let price = row.find("td:nth-child(3)").text();

        selectedMeals.push({
            name: name,
            price: price
        });

        alert("تم اختيار: " + name);
    });

    // زر الإرسال (التحقق + الحساب)
    $("#submitBtn").click(function (e) {
        e.preventDefault();

        let name = $("#name").val();
        let account = $("#nationalId").val();
        let date = $("#dob").val();
        let mobile = $("#mobile").val();

        // التحقق من الاسم
        if (!/^[A-Za-z ]+$/.test(name)) {
            alert("الاسم يجب أن يكون باللغة الإنكليزية فقط");
            return;
        }

        // التحقق من رقم الحساب
        if (!/^0\d{5}$/.test(account)) {
            alert("رقم الحساب يجب أن يكون 6 أرقام ويبدأ بـ 0");
            return;
        }

        // التحقق من التاريخ
        if (date === "") {
            alert("يرجى إدخال تاريخ صحيح");
            return;
        }

        // التحقق من الموبايل
        if (!/^09\d{8}$/.test(mobile)) {
            alert("رقم الموبايل غير صحيح");
            return;
        }

        // 🔥 الحساب
        let total = 0;

        selectedMeals.forEach(meal => {
            let price = parseInt(meal.price);
            total += price;
        });

        let tax = total * 0.1;
        let final = total + tax;

        let mealNames = selectedMeals.map(m => m.name).join("\n");

        // عرض النتيجة
       alert(
    "🍽️ الوجبات المختارة:\n" + mealNames +
    "\n\n💰 المجموع: " + total +
    "\n🧾 الضريبة: " + tax +
    "\n✅ المبلغ النهائي: " + final +
    "\n\n🙏 شكراً لطلبك من مطعم اللقمة الهنية!" +
    "\nنتمنى لك وجبة شهية 😋"
);
    });
$("#continueBtn").click(function () {

    if(selectedMeals.length === 0){
        alert("يرجى اختيار وجبة واحدة على الأقل");
        return;
    }

    $("#selected-meal-form").show();
});
});