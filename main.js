// ==UserScript==
// @name         知识星球自动点赞脚本
// @namespace    https://github.com/CC11001100/ZhiShiXingQiu-Bang
// @version      0.3
// @description  知识星球自动化点赞，解放双手！
// @author       CC11001100
// @match       *://*/*
// @grant        none
// ==/UserScript==
(async () => {

    let bangCount = 0;
    let c = 5;
    while (true) {
        try {
            const bangElementList = document.querySelectorAll("div[title=点赞]");
            for (let bangElement of bangElementList) {
                if (bangElement.getAttribute("class") !== "like") {
                    continue;
                }
                // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
                bangElement.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
                await sleep(500);
                bangElement.click();
                await sleep(500)
                bangCount++;
            }

            // 滚动到没有内容时的标记，为了防止网速慢到石化，退出时多给点机会
            if (document.querySelector(".no-more") !== null) {
                c--;
                await sleep(1000);
                if (c <= 0) {
                    break;
                }
            }

            await scrollToBottom();
        } catch (e) {
            alert("哦豁完蛋，报错了： " + e.message)
        }
        await sleep(1000);
    }
    alert(`点赞完成，本次共点赞${bangCount}条动态！`);

    async function sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

    async function scrollToBottom() {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        await sleep(100);
        window.scrollTo({
            top: document.body.scrollHeight - 300,
            behavior: "smooth"
        });
        await sleep(100);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }

})();