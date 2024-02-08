customElements.define("comment-tree", class extends HTMLElement {
    constructor() {
        super()
        let shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.innerHTML = `
        <style>
            .input {
                width: 60%;
            }

            .submit {
                width: 20%;
                margin-bottom: 2px;
            }

            .reply-comments {
            padding-left: 15px;
            padding-top: 2px;
            }
        </style>

        <div id="form">
            <textarea class="input" placeholder="Ваш комментарий" rows="2"></textarea>
            <button class="submit">Отправить</button>
        </div>
        <div id="comments" class="comments"></div>
        `

        let comments = shadowRoot.getElementById("comments")
        let newElement = shadowRoot.querySelector(".submit")
        newElement.addEventListener("click", () => {
            let newComment = document.createElement("div")
            let commentTemplate = document.getElementById("commentTemplate")
            let content = commentTemplate.content.cloneNode(true)
            newComment.appendChild(content)
            let slot = newComment.querySelector("slot")
            let input = shadowRoot.querySelector(".input")
            slot.textContent = input.value
            if(slot.textContent != "") {
                comments.appendChild(newComment)
                input.value = ""

            }
            this.addListeners(newComment)
 
        })
    }

    addListeners(newComment) {
        newComment.querySelector(".like").addEventListener("click", () => {
            let count = newComment.querySelector(".like-count")
            count.textContent = parseInt(count.textContent) + 1
        })

        newComment.querySelector(".answer").addEventListener("click", () => {
            let replyComments = newComment.querySelector(".reply-comments")
            let replyCommentInput = document.createElement("textarea")
            replyCommentInput.placeholder = "Ваш комментарий"
            replyCommentInput.className = "input"
            replyComments.appendChild(replyCommentInput)
            let replyCommentButton = document.createElement("button")
            replyCommentButton.textContent = "Отправить"
            replyCommentButton.className = "submit"
            replyComments.appendChild(replyCommentButton)
            replyCommentButton.addEventListener("click", () => {
                let replyComment = document.createElement("div")
                let commentTemplate = document.getElementById("commentTemplate")
                let content = commentTemplate.content.cloneNode(true)
                replyComment.appendChild(content)
                let replySlot = replyComment.querySelector("slot")
                replySlot.textContent = replyCommentInput.value
                if(replySlot.textContent != "") {
                    replyComments.insertBefore(replyComment, replyCommentInput)
                    replyCommentInput.remove()
                    replyCommentButton.remove()
                }
                this.addListeners(replyComment)

            })
        })

        newComment.querySelector(".delete").addEventListener("click", () => {
            newComment.remove()
        })
    }
});