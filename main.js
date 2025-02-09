function uploadMedia(user) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = true; // 允许多文件上传
    
    input.onchange = function(e) {
        const files = e.target.files;
        const gallery = document.getElementById(`gallery-${user}`);
        
        for(let file of files) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const mediaElement = file.type.startsWith('image/') 
                    ? document.createElement('img')
                    : document.createElement('video');
                
                if (mediaElement instanceof HTMLVideoElement) {
                    mediaElement.controls = true;
                }
                
                mediaElement.src = event.target.result;
                mediaElement.title = file.name;
                
                // 添加删除按钮
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                wrapper.appendChild(mediaElement);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '×';
                deleteBtn.style.position = 'absolute';
                deleteBtn.style.top = '5px';
                deleteBtn.style.right = '5px';
                deleteBtn.style.background = 'rgba(255,0,0,0.7)';
                deleteBtn.style.color = 'white';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '50%';
                deleteBtn.style.width = '20px';
                deleteBtn.style.height = '20px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.zIndex = '1000';
                deleteBtn.onclick = () => wrapper.remove();
                
                wrapper.appendChild(deleteBtn);
                gallery.appendChild(wrapper);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}); 
