document.addEventListener('DOMContentLoaded', function() {
    const shareModal = document.getElementById('share-modal');
    const commentModal = document.getElementById('comment-modal');
    const imageModal = document.getElementById('image-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const qrcodeElement = document.getElementById('qrcode');

    const wittyComments = {
        "card-1": [
            { author: "结构安全爱好者", text: "这种'悬浮式'地基设计，真是对现代建筑力学一次大胆的挑衅。牛顿的棺材板快压不住了。", isOp: true },
            { author: "建材观察员", text: "能清晰地看到钢筋和混凝土的分离，这是一种被称为'骨肉分离'的建筑风格，非常罕见。", isOp: false },
            { author: "新晋业主", text: "买房时说的是'坚如磐石'，住进来才发现是'摇摇欲坠'。每天都在体验免费的地震模拟。", isOp: false },
            { author: "保险推销员", text: "请问需要了解一下意外伤害险吗？我们最近有买一年送一年的活动。", isOp: false },
        ],
        "card-2": [
            { author: "空间管理大师", text: "突破天际，挑战极限。在有限的空间里创造无限的可能，这就是所谓的'空中楼阁'吧。", isOp: true },
            { author: "天气预报员", text: "经观测，该区域局部有小雨，主要集中在楼下住户的客厅和卧室。", isOp: false },
            { author: "当代鲁班", text: "这种施工工艺，完美地将邻里关系从'和睦'提升到了'同舟共济'的层面。", isOp: false },
            { author: "无人机飞手", text: "我飞无人机都不敢离这么近，生怕一阵风吹过，它就成了小区最新的'自由落体'景观。", isOp: false },
        ],
        "card-3": [
            { author: "极限运动玩家", text: "回家就像玩闯关游戏，不仅考验智慧，还考验腰腹力量。下次可以考虑办个'业主障碍赛'。", isOp: true },
            { author: "空间整理师", text: "通过将外部空间内化，实现了'出门即到储物间'的便捷体验，就是有点费门。", isOp: false },
            { author: "安全出口标志", text: "我只是个标志，但我感觉自己快要被这些杂物逼得抑郁了。说好的'生命通道'呢？", isOp: false },
        ],
        "card-4": [
            { author: "植物保护者", text: "每一颗被圈起来的小草，都在无声地诉说着：'我本可以自由生长，直到遇到了这家的篱笆'。", isOp: true },
            { author: "印象派画家", text: "这种将公共绿地转化为私人花园的创作手法，大胆地打破了人与自然的界限，也打破了邻里之间的和谐。", isOp: false },
            { author: "经济学家", text: "以最小的成本，撬动了最大的公共资源。这是教科书级别的'外部性'案例。", isOp: false },
        ],
        "card-5": [
            { author: "小区门口的石狮子", text: "我亲眼看到挖掘机大摇大摆地开进来，那一刻，我感觉我的威严扫地。", isOp: true },
            { author: "小区大门", text: "我存在的意义是什么？是成为一个象征，还是成为一个真正的守护者？我陷入了深深的哲学思考。", isOp: false },
            { author: "共享单车", text: "在这里，我感受到了前所未有的自由。没有人管我，我可以随意停放，甚至可以和水泥黄沙睡在一起。", isOp: false },
        ]
    };

    // --- Image Zoom Logic ---
    const galleryImages = document.querySelectorAll('.masterpiece-card img');
    const modalImage = document.getElementById('zoomed-image');
    const captionText = document.getElementById('caption');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            if(imageModal) imageModal.style.display = "block";
            modalImage.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    // --- Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            if(backToTopBtn) backToTopBtn.style.display = "block";
        } else {
            if(backToTopBtn) backToTopBtn.style.display = "none";
        }
    };

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // --- Copy Template Logic ---
    const copySocialBtn = document.getElementById('copy-social-btn');
    const socialTextContainer = document.getElementById('social-media-template-text');

    if(copySocialBtn && socialTextContainer) {
        copySocialBtn.addEventListener('click', () => {
            const textToCopy = socialTextContainer.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copySocialBtn.innerText = '已复制！请粘贴到您的社交媒体！';
                copySocialBtn.disabled = true;
                setTimeout(() => {
                    copySocialBtn.innerText = '一键复制所有文案';
                    copySocialBtn.disabled = false;
                }, 3000);
            }).catch(err => {
                console.error('复制失败: ', err);
                copySocialBtn.innerText = '复制失败，请手动复制';
                setTimeout(() => {
                    copySocialBtn.innerText = '一键复制所有文案';
                }, 3000);
            });
        });
    }

    const copyComplaintBtn = document.getElementById('copy-template-btn');
    const complaintTextContainer = document.getElementById('complaint-template-text');

    if(copyComplaintBtn && complaintTextContainer) {
        copyComplaintBtn.addEventListener('click', () => {
            const textToCopy = complaintTextContainer.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyComplaintBtn.innerText = '已复制！';
                copyComplaintBtn.disabled = true;
                setTimeout(() => {
                    copyComplaintBtn.innerText = '一键复制投诉模板';
                    copyComplaintBtn.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('复制失败: ', err);
                copyComplaintBtn.innerText = '复制失败，请手动复制';
                setTimeout(() => {
                    copyComplaintBtn.innerText = '一键复制投诉模板';
                }, 2000);
            });
        });
    }

    // --- Like Button Logic ---
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const match = btn.innerText.match(/\((\d+)\)/);
            if (match) {
                let currentLikes = parseInt(match[1], 10);
                btn.innerText = `👍 点赞 (${currentLikes + 1})`;
            }
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.backgroundColor = '#e9ecef';
            btn.style.color = '#888';
        }, { once: true });
    });

    // --- Comment Button Logic ---
    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.masterpiece-card');
            const cardId = card.dataset.cardId;
            const comments = wittyComments[cardId] || [];
            const commentList = document.getElementById('comment-list');
            
            commentList.innerHTML = ''; // Clear previous comments

            if (comments.length > 0) {
                comments.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'comment';
                    commentEl.innerHTML = `
                        <div class="comment-author">
                            ${comment.author}
                            ${comment.isOp ? '<span class="is-op">楼主</span>' : ''}
                        </div>
                        <p class="comment-text">${comment.text}</p>
                        <div class="comment-meta">${Math.floor(Math.random() * 50) + 2}分钟前</div>
                    `;
                    commentList.appendChild(commentEl);
                });
            } else {
                commentList.innerHTML = '<p>暂无评论，欢迎您来发表高见！</p>';
            }

            if(commentModal) commentModal.style.display = 'block';
        });
    });

    // --- Modal Close Logic ---
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(shareModal) shareModal.style.display = 'none';
            if(commentModal) commentModal.style.display = 'none';
            if(imageModal) imageModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == shareModal) {
            shareModal.style.display = 'none';
        }
        if (event.target == commentModal) {
            commentModal.style.display = 'none';
        }
        if (event.target == imageModal) {
            imageModal.style.display = 'none';
        }
    });
    
    // --- Share Button Logic ---
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(shareModal) shareModal.style.display = 'block';
        });
    });
    
    if (qrcodeElement) {
        new QRCode(qrcodeElement, {
            text: window.location.href,
            width: 160,
            height: 160,
        });
    }
    
    // --- Active Navigation Link Scrolling ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}); 