// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
if (localStorage.getItem("AlwaysCounting") === null){
    localStorage.setItem("AlwaysCounting",0);
}

var count = new Number;
count = parseFloat(localStorage.getItem("AlwaysCounting"));

//Save item into localStorage
function Save() {
    var SaveItem = document.getElementById("ToDoItem").value;
    if (SaveItem !=""){ 
        count =  count + 1
        localStorage.setItem(count,SaveItem);
        localStorage.setItem("AlwaysCounting",count.toString());
        NewItem(count)
    }
}

//Create new todolist item
function NewItem(ItemCount) {
    var Timer = null;
    var CreateNewItem = document.createElement("p");
    var NewItemCloseItem = document.createElement("button");
    var NewItemClock = document.createElement("button");
    NewItemCloseItem.innerHTML = "完成";
    NewItemClock.innerHTML =  "計時器";
    CreateNewItem.setAttribute("id", ItemCount);
    CreateNewItem.setAttribute("class", "ToDoItem");
    NewItemCloseItem.setAttribute("id", ItemCount + "Close");
    NewItemCloseItem.setAttribute("class", "CloseItem");
    NewItemClock.setAttribute("id", ItemCount + "Clock");
    NewItemClock.setAttribute("class", "NewClockButton");
    NewItemCloseItem.addEventListener("click",function(){
        clearInterval(Timer)
        var parent = document.getElementById("ShowArea");
        var child = document.getElementById(NewItemCloseItem.getAttribute("id").replace("Close", ""));
        parent.removeChild(child);
        localStorage.removeItem(NewItemCloseItem.getAttribute("id").replace("Close", ""))
        if (!!localStorage.getItem(NewItemCloseItem.getAttribute("id").replace("Close", "")+"DoingTime")){
        localStorage.removeItem(NewItemCloseItem.getAttribute("id").replace("Close", "")+"DoingTime")
        }
    });
    NewItemClock.addEventListener("click",function(){
        if (!document.getElementById(NewItemCloseItem.getAttribute("id").replace("Close", "") + "ClockItem")){
            var Target = document.getElementById(NewItemCloseItem.getAttribute("id").replace("Close", ""));
            var Div = document.createElement("div");
            var Clock = document.createElement("clock");
            var Form = document.createElement("form");
            var Input = document.createElement("input");
            var Button = document.createElement("button");
            Div.setAttribute("id",NewItemCloseItem.getAttribute("id").replace("Close", "") + "ClockDiv")
            Div.setAttribute("class","ClockDiv");
            Input.setAttribute("type", "number");
            Input.setAttribute("min",0)
            Input.setAttribute("value","請輸入計時分鐘");
            Input.setAttribute("id", NewItemCloseItem.getAttribute("id").replace("Close", "") + "ClockInput");
            Clock.setAttribute("id", NewItemCloseItem.getAttribute("id").replace("Close", "") + "ClockItem");
            Button.setAttribute("type","button");
            Button.setAttribute("class", "ClockButton")
            Button.innerHTML = "開始計時";
            Button.addEventListener("click", function(){
                if (Timer){
                    clearInterval(Timer)
                    Button.innerHTML = "開始計時"
                    Timer = null
                }
                else{
                var InputTime = (document.getElementById(NewItemCloseItem.getAttribute("id").replace("Close", "") + "ClockInput").value)*60;
                var DoingTime = parseInt(InputTime/60);
                Timer = setInterval(function(){
                    var second = InputTime - parseInt(InputTime/60)*60
                    if (parseInt(InputTime/60)>0){
                        Button.innerHTML = "剩下" + parseInt(InputTime/60) + "分" + second + "秒"
                    }
                    else{
                        Button.innerHTML = "剩下" + second + "秒"
                    }
                    if(InputTime == 0){
                        clearInterval(Timer);
                        window.alert("時間到");
                        Button.innerHTML = "開始計時"
                        if (!!localStorage.getItem(NewItemCloseItem.getAttribute("id").replace("Close", "") + "DoingTime")){
                            var LastDoingTime = localStorage.getItem(NewItemCloseItem.getAttribute("id").replace("Close", "")+ "DoingTime");
                            var number = parseInt(DoingTime) + parseInt(LastDoingTime);
                            localStorage.setItem(NewItemCloseItem.getAttribute("id").replace("Close", "") + "DoingTime", number)
                        }
                        else {
                            localStorage.setItem(NewItemCloseItem.getAttribute("id").replace("Close", "")+"DoingTime", DoingTime)
                        }
                    window.location.reload()
                    };
                    InputTime -= 1
                },1000);
                }
            });
            Target.appendChild(Div);
            Div.appendChild(Clock)
            Clock.appendChild(Form);
            Form.appendChild(Input);
            Form.appendChild(Button)
            }
        else {
            var parent = document.getElementById(NewItemClock.getAttribute("id").replace("Clock", ""));
            var child = document.getElementById(NewItemClock.getAttribute("id").replace("Clock", "")+"ClockDiv");
            parent.removeChild(child);
        }
     });
    var NewItemContent = document.createTextNode(localStorage.getItem(ItemCount));
    if (!!localStorage.getItem(ItemCount + "DoingTime")){
        CreateNewItem.innerHTML =  "已進行" + localStorage.getItem(ItemCount + "DoingTime") + "分鐘的："
    };
    CreateNewItem.appendChild(NewItemContent);
    CreateNewItem.appendChild(NewItemCloseItem);
    CreateNewItem.appendChild(NewItemClock);
    var ShowArea = document.getElementById("ShowArea");
    ShowArea.appendChild(CreateNewItem)

}

//Show exist item
function Show(){
    if (localStorage.length>1){
        for (var i = 0; i < localStorage.getItem("AlwaysCounting"); i++){
            if (localStorage.getItem(i+1) != null){
                NewItem(i+1)
            }
        }
    }
}

//Clean up all item
function Clear() {
    localStorage.clear()
    window.location.reload()
}

function OnMouseOver(obj){
    obj.style.boxShadow = "0 0px 6px 0px bfbfbf"
}

function OnMouseOut(obj){
    obj.style.boxShadow = "0 0px 0px 0px"
}
 