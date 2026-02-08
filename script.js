// 全局变量
let dialogConfig = null;
let resourceData = null;

// 页面加载完成后执行
window.onload = function() {
    // 加载对话配置
    loadDialogConfig();
    
    // 加载教学资源数据
    loadResourceData();
    
    // 初始化标签页切换
    initTabSwitch();
    
    // 初始化对话功能
    initDialog();
    
    // 初始化教学资源功能
    initResource();
};

// 加载对话配置
function loadDialogConfig() {
    fetch('dialogConfig.json')
        .then(response => response.json())
        .then(data => {
            dialogConfig = data;
            console.log("对话配置加载成功！");
            addSystemMessage("系统已就绪，您可以开始对话了！");
        })
        .catch(err => {
            console.error("对话配置加载失败：", err);
            // 加载失败时使用默认配置
            dialogConfig = {
                dialogRules: [
                    {keywords: ["你好", "嗨", "hello"], reply: "您好！很高兴为您服务！"},
                    {keywords: ["再见", "拜拜"], reply: "再见！感谢您的使用，期待下次交流！"},
                    {keywords: ["谢谢", "感谢"], reply: "不客气！能帮到您我很开心！"},
                    {keywords: ["名字", "称呼"], reply: "我是智能对话助手，您可以叫我小智。"},
                    {keywords: ["时间", "几点"], reply: `现在是 ${new Date().toLocaleTimeString()}。`},
                    {keywords: ["日期", "今天"], reply: `今天是 ${new Date().toLocaleDateString()}。`},
                    {keywords: ["天气"], reply: "抱歉，我目前无法获取实时天气信息。"},
                    {keywords: ["帮助", "怎么用"], reply: "只需在输入框中输入关键词，我会根据关键词回复您。试试输入'你好'或'时间'。"}
                ],
                defaultReply: "抱歉，我没有理解您的意思。您可以尝试输入其他关键词，或者输入'帮助'查看使用说明。"
            };
            addSystemMessage("⚠️ 配置文件加载失败，已启用默认配置");
        });
}

// 加载教学资源数据
function loadResourceData() {
    // 这里使用模拟数据，实际项目中可以从JSON文件或API加载
    resourceData = {
        categories: [
            {
                id: "category1",
                name: "数学",
                subcategories: [
                    {
                        id: "sub1-1",
                        name: "代数",
                        resources: [
                            {
                                id: "res1-1-1",
                                title: "一元一次方程",
                                type: "video",
                                description: "详细讲解一元一次方程的解法和应用",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["一元一次方程", "代数", "方程解法"]
                            },
                            {
                                id: "res1-1-2",
                                title: "二元一次方程组",
                                type: "video",
                                description: "二元一次方程组的解法和应用实例",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["二元一次方程组", "代数", "方程组解法"]
                            }
                        ]
                    },
                    {
                        id: "sub1-2",
                        name: "几何",
                        resources: [
                            {
                                id: "res1-2-1",
                                title: "三角形的性质",
                                type: "video",
                                description: "三角形的基本性质和定理",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["三角形", "几何", "性质定理"]
                            }
                        ]
                    }
                ]
            },
            {
                id: "category2",
                name: "语文",
                subcategories: [
                    {
                        id: "sub2-1",
                        name: "阅读理解",
                        resources: [
                            {
                                id: "res2-1-1",
                                title: "现代文阅读技巧",
                                type: "video",
                                description: "现代文阅读理解的方法和技巧",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["阅读理解", "现代文", "阅读技巧"]
                            }
                        ]
                    },
                    {
                        id: "sub2-2",
                        name: "作文",
                        resources: [
                            {
                                id: "res2-2-1",
                                title: "议论文写作",
                                type: "video",
                                description: "议论文的结构和写作技巧",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["议论文", "作文", "写作技巧"]
                            }
                        ]
                    }
                ]
            },
            {
                id: "category3",
                name: "英语",
                subcategories: [
                    {
                        id: "sub3-1",
                        name: "听力",
                        resources: [
                            {
                                id: "res3-1-1",
                                title: "英语听力技巧",
                                type: "video",
                                description: "提高英语听力水平的方法和技巧",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["英语听力", "听力技巧", "听力训练"]
                            }
                        ]
                    },
                    {
                        id: "sub3-2",
                        name: "口语",
                        resources: [
                            {
                                id: "res3-2-1",
                                title: "日常英语对话",
                                type: "video",
                                description: "常用英语对话场景和表达",
                                url: "", // 实际项目中填入视频URL
                                keywords: ["英语口语", "日常对话", "英语表达"]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    // 渲染资源目录
    renderResourceTree();
}

// 初始化标签页切换
function initTabSwitch() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 切换按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// 初始化对话功能
function initDialog() {
    // 发送按钮点击事件
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    
    // 回车发送
    document.getElementById('inputMsg').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 初始问候
    setTimeout(() => {
        addSystemMessage("欢迎使用教学小程序！我是您的智能对话助手，有什么可以帮助您的吗？");
    }, 1000);
}

// 发送消息
function sendMessage() {
    const inputMsg = document.getElementById('inputMsg').value.trim();
    if (!inputMsg) return;
    
    // 显示用户输入
    addUserMessage(inputMsg);
    
    // 清空输入框
    document.getElementById('inputMsg').value = "";
    
    // 显示正在输入
    setTypingIndicator(true);
    
    // 模拟思考时间
    setTimeout(() => {
        // 获取回复并显示
        const reply = getReply(inputMsg);
        setTypingIndicator(false);
        addSystemMessage(reply);
    }, 800);
}

// 获取回复
function getReply(inputText) {
    if (!dialogConfig) return "配置未加载完成，请稍等...";
    
    // 遍历配置中的关键词规则
    for (let rule of dialogConfig.dialogRules) {
        // 判断输入是否包含任意一个关键词（忽略大小写）
        const hasKeyword = rule.keywords.some(keyword => 
            inputText.toLowerCase().includes(keyword.toLowerCase())
        );
        if (hasKeyword) {
            return rule.reply;
        }
    }
    // 无匹配关键词时返回默认回复
    return dialogConfig.defaultReply;
}

// 添加用户消息
function addUserMessage(message) {
    const dialogContent = document.getElementById('dialogContent');
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.textContent = message;
    dialogContent.appendChild(messageElement);
    scrollToBottom();
}

// 添加系统消息
function addSystemMessage(message) {
    const dialogContent = document.getElementById('dialogContent');
    const messageElement = document.createElement('div');
    messageElement.className = 'message system-message';
    messageElement.textContent = message;
    dialogContent.appendChild(messageElement);
    scrollToBottom();
}

// 滚动到底部
function scrollToBottom() {
    const dialogContent = document.getElementById('dialogContent');
    dialogContent.scrollTop = dialogContent.scrollHeight;
}

// 显示/隐藏正在输入指示器
function setTypingIndicator(show) {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = show ? 'block' : 'none';
    if (show) scrollToBottom();
}

// 初始化教学资源功能
function initResource() {
    // 搜索功能
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 渲染资源目录
function renderResourceTree() {
    const resourceTree = document.getElementById('resourceTree');
    resourceTree.innerHTML = '';
    
    if (!resourceData || !resourceData.categories) return;
    
    resourceData.categories.forEach(category => {
        const categoryLi = document.createElement('li');
        const categoryA = document.createElement('a');
        categoryA.textContent = category.name;
        categoryA.addEventListener('click', function(e) {
            e.preventDefault();
            // 展开/折叠子目录
            const subList = this.nextElementSibling;
            if (subList) {
                subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
            }
        });
        categoryLi.appendChild(categoryA);
        
        if (category.subcategories && category.subcategories.length > 0) {
            const subList = document.createElement('ul');
            category.subcategories.forEach(subcategory => {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.textContent = subcategory.name;
                subA.addEventListener('click', function(e) {
                    e.preventDefault();
                    // 展开/折叠资源列表
                    const resList = this.nextElementSibling;
                    if (resList) {
                        resList.style.display = resList.style.display === 'none' ? 'block' : 'none';
                    }
                });
                subLi.appendChild(subA);
                
                if (subcategory.resources && subcategory.resources.length > 0) {
                    const resList = document.createElement('ul');
                    subcategory.resources.forEach(resource => {
                        const resLi = document.createElement('li');
                        const resA = document.createElement('a');
                        resA.textContent = resource.title;
                        resA.addEventListener('click', function(e) {
                            e.preventDefault();
                            // 显示资源详情
                            showResourceDetail(resource);
                            
                            // 移除其他资源的激活状态
                            document.querySelectorAll('#resourceTree a').forEach(a => {
                                a.classList.remove('active');
                            });
                            // 添加当前资源的激活状态
                            this.classList.add('active');
                        });
                        resLi.appendChild(resA);
                        resList.appendChild(resLi);
                    });
                    subLi.appendChild(resList);
                }
                
                subList.appendChild(subLi);
            });
            categoryLi.appendChild(subList);
        }
        
        resourceTree.appendChild(categoryLi);
    });
}

// 显示资源详情
function showResourceDetail(resource) {
    const resourceDetail = document.getElementById('resourceDetail');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // 显示资源详情
    resourceDetail.innerHTML = `
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
    `;
    
    // 显示视频播放器
    if (resource.type === 'video') {
        videoPlayer.innerHTML = `
            <video controls width="100%" height="auto">
                <source src="${resource.url}" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
        `;
    } else {
        videoPlayer.innerHTML = '';
    }
}

// 执行搜索
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchTerm) return;
    
    // 搜索资源
    const searchResults = [];
    
    if (resourceData && resourceData.categories) {
        resourceData.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.resources.forEach(resource => {
                    // 检查关键词是否匹配
                    const matches = resource.keywords.some(keyword => 
                        keyword.toLowerCase().includes(searchTerm)
                    );
                    // 检查标题是否匹配
                    const titleMatches = resource.title.toLowerCase().includes(searchTerm);
                    // 检查描述是否匹配
                    const descMatches = resource.description.toLowerCase().includes(searchTerm);
                    
                    if (matches || titleMatches || descMatches) {
                        searchResults.push({
                            ...resource,
                            category: category.name,
                            subcategory: subcategory.name
                        });
                    }
                });
            });
        });
    }
    
    // 显示搜索结果
    const resourceDetail = document.getElementById('resourceDetail');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (searchResults.length > 0) {
        // 显示第一个搜索结果
        const firstResult = searchResults[0];
        resourceDetail.innerHTML = `
            <h3>搜索结果 (${searchResults.length})</h3>
            <h4>${firstResult.title}</h4>
            <p><strong>分类：</strong>${firstResult.category} > ${firstResult.subcategory}</p>
            <p>${firstResult.description}</p>
            ${searchResults.length > 1 ? `<p>找到 ${searchResults.length} 个相关资源，显示第一个结果。</p>` : ''}
        `;
        
        // 显示视频播放器
        if (firstResult.type === 'video') {
            videoPlayer.innerHTML = `
                <video controls width="100%" height="auto">
                    <source src="${firstResult.url}" type="video/mp4">
                    您的浏览器不支持视频播放。
                </video>
            `;
        } else {
            videoPlayer.innerHTML = '';
        }
    } else {
        resourceDetail.innerHTML = `
            <h3>搜索结果</h3>
            <p>未找到与 "${searchTerm}" 相关的资源，请尝试其他关键词。</p>
        `;
        videoPlayer.innerHTML = '';
    }
}