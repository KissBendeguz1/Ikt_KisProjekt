
function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);

    if (selected) {
        return selected.value;
    }

    return null;
}


async function validate() {

var nevField = document.getElementById("nev")
var felhasznalonevField = document.getElementById("felhasznalonev")
var jelszoField = document.getElementById("jelszo")
var szerepkorField = document.getElementById("szerepkor")
var mobileField = document.getElementById("mobil")
var emailField = document.getElementById("email")
var gepField = document.getElementsByName("szamitogep")
var autoField = document.getElementsByName("auto");
var auto = getRadioValue("auto");
var pc = getRadioValue("szamitogep");


var validForm = true;
mobilregex = /^(?=.{3,}$)[0-9+\-/ #]+$/
nevergex = /^(?=.{3,}$)[^0-9]*$/
emailregex = /^(?=.{3,}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
if (nevergex.test(nevField.value)) {
    nevField.classList.remove("border-danger")
} else {
    validForm= false
    nevField.classList.add("border-danger")
}

if (felhasznalonevField.value.length >= 3) {
    felhasznalonevField.classList.remove("border-danger")

} else {
    validForm = false
    felhasznalonevField.classList.add("border-danger")
}

if (jelszoField.value.length >= 3) {
    jelszoField.classList.remove("border-danger")

} else {
    validForm = false
    jelszoField.classList.add("border-danger")
}


if (mobilregex.test(mobileField.value)) {
    mobileField.classList.remove("border-danger")

} else {
    validForm = false
    mobileField.classList.add("border-danger")
}

if (emailregex.test(emailField.value)) {
    emailField.classList.remove("border-danger")

} else {
    validForm = false
    emailField.classList.add("border-danger")
}

if (pc == null) {
    validForm = false
    gepField[0].classList.add("border-danger");
    gepField[1].classList.add("border-danger");
} else {
    gepField[0].classList.remove("border-danger");
    gepField[1].classList.remove("border-danger");
    if (pc == "van") {
        pc = 1
    } else {
        pc = 0
}

}

if (auto == null) {
    validForm = false
    autoField[0].classList.add("border-danger");
    autoField[1].classList.add("border-danger");
} else {
    autoField[0].classList.remove("border-danger");
    autoField[1].classList.remove("border-danger");
    if (auto == "van") {
        auto = 1
    } else {
        auto = 0
}
}

if (validForm) {
    console.log(nevField + felhasznalonevField + jelszoField + mobileField + emailField + pc + auto + szerepkorField)
    console.log(auto)
    console.log(pc)
} else {
    console.log("Nem valid form")
}


console.log(validForm)

if (validForm) {
        const formData = new FormData();
        formData.append('nev', nevField.value);
        formData.append('loginnev', felhasznalonevField.value);
        formData.append('jelszo', jelszoField.value);
        formData.append('szerepkor', szerepkorField.value);
        formData.append('mobil', mobileField.value);
        formData.append('email', emailField.value);
        formData.append('szamitogep', pc);
        formData.append('auto', auto);

        try {
            const response = await fetch('reg.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.text();
            console.log("Szerver", result);
            alert(result);
        } catch (error) {
            console.error("Hiba történt a regisztracio során:", error);
            alert("Hiba történt a regisztracio során:");
        }
    } else {
        console.log("Nem valid form");
    }


}

