console.log("Welcome to Project 10");

// Declaring the Index of our Iterator Globally
let nextIndex = -1;

//Next User Iterator
function nextUser(userArray) {

    return {
        next: function () {
            if (nextIndex < userArray.length) {
                return {
                    value: userArray[++nextIndex],
                    done: false
                }
            }
            else {
                return {
                    done: true
                }
            }
        }
    }
}

//Previous User Iterator
function previousUser(userArray) {

    return {
        next: function () {
            if (nextIndex > 0) {
                return {
                    value: userArray[--nextIndex],
                    done: false
                }
            }
            else {
                return {
                    done: true
                }
            }
        }
    }
}

//Get User Data function using fetch API
function getData(direction) {
    //users data url
    let url = "data.json";
    
    fetch(url).then(function (response) {

        return response.json();

    }).then(function (data) {

        //Declaring both the Iterators
        nxtUser = nextUser(data);
        prvUser = previousUser(data);

        //Specifying the next and previous user
        if (direction == "NEXT")
            { object = nxtUser.next();
              user = object.value;
              done_status = object.done
            }
        else if (direction == "PREVIOUS")
            {
                object = prvUser.next();
                user = object.value;
                done_status = object.done
            }
        
        
        //Populating the dom profile-card-id depending upon the direction
        let profile_card = document.getElementById('profile-card-id');

        if (done_status == false) {
            profile_card.innerHTML = `<div id="image"><img src="${user.image}" alt=""></div>
            <br>
            <div id="profile">
                <ul>
                    <li><h5>Name:</h5> ${user.name}</li>
                    <li><h5>Age:</h5> ${user.age}</li>
                    <li><h5>City:</h5> ${user.city}</li>
                    <li><h5>Language:</h5> ${user.language}</li>
                    <li><h5>Framework:</h5> ${user.framework}</li>
                </ul>
            </div>
            <br>`
            
        }
        else {
            document.getElementById('alert').setAttribute('style',"display: block");
            setTimeout(() => {
                document.getElementById('alert').setAttribute('style',"display: none");
            }, 5000);
        }



    })

}


let getCV = document.getElementById('get-cv');
getCV.addEventListener('click', function () {
    getData("NEXT");
    document.getElementById('next').setAttribute("style","display: block")
    document.getElementById('previous').setAttribute("style","display: block")
    document.getElementById('profile-card-id').setAttribute("style","display: block")
    getCV.setAttribute("style","display:none;")
});

let next = document.getElementById('next');
next.addEventListener('click',function(){
    getData("NEXT");
});

let previous = document.getElementById('previous');
previous.addEventListener('click', function(){
    getData("PREVIOUS");
});


