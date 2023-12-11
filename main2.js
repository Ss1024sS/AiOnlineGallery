window.onload = function() {
    var introLines = document.querySelectorAll(".intro p");
    introLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
        }, index * 2000); // 每行间隔2秒显示
    });
};

setTimeout(() => {
    document.getElementById("explore-button").style.opacity = 1;
}, 20000); // 10段文本，每段2秒，总共20秒后显示按钮

document.getElementById("explore-button").addEventListener("click", function() {
    window.location.href = 'index3.html'; // 跳转到index3.html
});
