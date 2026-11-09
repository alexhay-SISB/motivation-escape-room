// Authored classroom support. No translation service or student data transmission.
const support=[
'重建需求层次。一个伙伴把五种需求从最低到最高排列；另一个伙伴把工作中的例子分到对应的需求类别。',
'理解需求的含义：哪一种需求与归属感有关？满足一种需求后会怎样？自我实现是什么意思？选择符合马斯洛理论的说法。',
'阅读员工的情况，找出尚未满足的需求，再选择合适的管理措施。注意：工作保障、同事关系、认可和发挥潜能是不同的需要。',
'判断马斯洛理论的优点和局限。考虑：员工是否都一样？需求是否容易衡量？每个人是否都按照相同的顺序发展？',
'把每个因素分到“保健因素”或“激励因素”。两位伙伴有不同的项目。仔细区分工作环境与工作本身。',
'选择改善工作场所的措施。思考：消除不满与让工作更有满足感是否相同？只改善薪酬或设备是否足够？',
'选择改善工作设计的方法。区分增加相同任务的数量与增加工作的挑战性和责任。考虑认可、成就感和晋升。',
'检查关于赫茨伯格理论的说法。判断理论的优点、局限，以及丰富工作内容时可能遇到的困难。',
'恢复泰勒的工作方法顺序。另一位伙伴回答：主要的激励因素是什么？谁计划工作？为什么研究工作方法？',
'计算工资并判断支付方式。一位工人生产了24件产品，每件获得2美元。另一位伙伴识别计件工资，并考虑它可能带来的风险。',
'判断科学管理可能产生的影响。考虑简单重复的任务、培训、工作兴趣、产量和产品质量。',
'判断泰勒的方法适合哪些工作。考虑产出是否容易计量、清晰指示的好处，以及重复的方法对创造力的影响。',
'把每句话归到对应的理论家：马斯洛、赫茨伯格或泰勒。注意每个理论解释工作动力的方式。',
'这家企业的工作条件安全，基本工资合理，但员工感到孤立，工作重复单调。选择针对这些问题的措施，并判断它们可能带来的好处。',
'找出准确的说法。比较工资在三个理论中的作用。选择激励方法时，要考虑员工的需要和工作类型。',
'最后一道锁：一位伙伴按三个房间的顺序输入已收集的钥匙数字。另一位伙伴按“金钱 → 需求层次 → 双因素”的顺序排列理论家。'
];
const glossary='Motivation 工作动力／激励；Physiological 生理需求；Safety 安全需求；Social 社交／归属需求；Esteem 尊重需求；Self-actualisation 自我实现；Hygiene factor 保健因素；Motivator 激励因素；Recognition 认可／表扬；Achievement 成就；Responsibility 责任；Promotion 晋升；Job security 工作保障；Working conditions 工作条件；Job enrichment 工作丰富化；Piece rate 计件工资；Time rate 计时工资；Output 产量；Efficiency 效率；Quality 质量；Labour turnover 员工流动率；Benefit 优点；Limitation 局限。';
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const panel=(title,text)=>`<details class="zh-help"><summary>${title}</summary><div lang="zh-Hans">${esc(text)}</div></details>`;
function enhance(){
 const app=document.querySelector('#app');if(!app||app.querySelector('[data-zh-help]'))return;
 const marker=document.createElement('div');marker.dataset.zhHelp='';
 const heading=app.querySelector('.game-top .eyebrow');
 const match=heading?.textContent.match(/LOCK (\d+) /);const n=match?Number(match[1])-1:-1;
 if(n>=0){
 marker.innerHTML=panel('中文帮助 · Read English first',support[n]+' 先读英文，再用中文帮助理解。中文帮助不扣分。')+panel('关键词 · Key vocabulary',glossary)+panel('操作说明 · How to play','与伙伴分享线索。每个人完成自己屏幕上的任务。选择答案或类别；用箭头或拖动排列项目；输入数字。点击 UNLOCK MY PART 提交。两个人都答对后，阅读解释，然后各自点击 NEXT CHALLENGE。最后点击 Escape together。答错扣10分；游戏提示扣15分。中文语言帮助免费，不属于游戏提示。');
 app.querySelector('.task-panel')?.prepend(marker);
 }else if(document.body.dataset.screen==='home'||document.body.dataset.screen==='waiting'){
 marker.innerHTML=panel('中文 · 加入与游戏说明','使用老师分享的班级链接。输入一个虚构昵称，不要输入真实姓名或个人资料。点击 LET’S GO 加入，然后等待老师随机配对。找到伙伴并坐在一起，每人使用自己的设备。先阅读英文；需要帮助时打开“中文帮助”。两人都必须完成任务才能继续。不要关闭游戏标签页。');app.prepend(marker);
 }else if(document.body.dataset.screen==='finished'){
 marker.innerHTML=panel('中文 · 任务完成','你们已经完成全部16道锁！查看得分、尝试次数和提示次数。打开下面的题目回顾解释。泰勒关注金钱与效率；马斯洛关注需求层次；赫茨伯格区分保健因素与激励因素。');app.prepend(marker);
 }else app.append(marker);
}
new MutationObserver(enhance).observe(document.querySelector('#app'),{childList:true});enhance();
