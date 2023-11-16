window.onload = function() {
    fetch("https://ctihcommentserver.ctih.repl.co");
    getComment();
};
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');

let likedComment = false;
let lastComment = "";
let currentUser = "";
let currentComment = "";
let currentLikes = 0;

function hover(img) {
    img.src = "https://i.ibb.co/gZG7x2g/6dcc94f6b4c1fac7f4d12336f054c8e6.webp"
}
function hoverOut(img) {
    img.src = "https://i.ibb.co/R7vtGCx/s4hype-profile.jpg"
}

function sendComment(button) {
    const request = new Request("https://ctihcommentserver.ctih.repl.co/comment?usr="+ document.getElementById("username").value +"&cmt=" + document.getElementById("comment").value);
    request.mode = 'no-cors';

    fetch(request, headers=headers).then((response) => {
        if(response.status===500) {
            window.location="https://s4hype.rf.gd/500.htm";
        }
    }
    )

    document.getElementById("username").value="";
    document.getElementById("comment").value="";
}
function autoNextComment(){
    getComment();
    likedComment = false;
    try {
        document.getElementById("like").style.backgroundColor = "background-color: rgba(0, 0, 0, 0.1);";
    } catch (error) {
        
    }
    setTimeout(autoNextComment, 5000);
}
autoNextComment();

function secret() {
    document.getElementById("secretP").innerHTML = ("You can access older versions of this websites using a '/' followed by the version. Example: 's4hype.xyz/0.01'")
}

function getComment() {
    const response = fetch("https://ctihcommentserver.ctih.repl.co/getcomment").then(response => response.json()).then(data => {
    if(data[1] != lastComment) {
        currentUser = data[0];
        currentComment = data[1]
        console.log(data);
        currentLikes = (data[2][0]);
        document.getElementById("review").innerHTML = data[0] + ":" + '<i> <strong>'+'"' + data[1] + '"' +'</i> </strong>' + "♥" + currentLikes;
    }
    if(data[1] == lastComment){
        getComment();
    }   
})}
function toggleComment() {
    if(!likedComment) {
        currentLikes = currentLikes + 1;
    }
    else {
        currentLikes = currentLikes - 1;
    }
    likedComment = !likedComment

    document.getElementById("review").innerHTML = currentUser + ":" + '<i> <strong>' + '"' + currentComment + '"' + '</i> </strong>' + "♥" + currentLikes;
    const request = new Request("https://ctihcommentserver.ctih.repl.co/" + (likedComment ? "like" : "unlike") + "?usr=" + currentUser + "&cmt=" + currentComment);
    request.mode = 'no-cors';
    fetch(request, headers=headers);
    document.getElementById("like").style.backgroundColor = likedComment ? "background-color: rgba(69, 20, 55, 0.5);" : "background-color: rgba(0, 0, 0, 0.1);";
}