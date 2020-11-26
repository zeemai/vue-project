<template>
<div class="div">
    <div class="row">
        <div class="col s6">
            <PostForm @postCreated="addPost" :editingPost="editingPost"/>
        </div>
        <div class="col s3">
            <p>Limit Number of posts</p>
            <!-- <input type="number" v-model="postLimit">    -->
            <!-- <button @click="setLimit()" class="waves-effect btn">Set</button> -->
            <select class="browser-default" v-model="postLimit" @change="setLimit()">
                <option value="" disabled selected>Choose your option</option>
                <option value=5 >5</option>
                <option value=10 >10</option>
                <option value=25 >25</option>
                <option value=100 >100</option>
            </select>         

        </div>
    </div>
    <div class="row">
        <div class="col s6" v-for="(post, index) in posts" v-bind:item="post" :index="index" :key="post.id">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        {{ post.title }}
                    </p>
                    <p class="timestamp">
                        {{ post.createdAt}}
                    </p>
                    <p>
                        {{ post.body }}
                    </p>
                </div>
                <div class="card-action">
                    <a href="#" @click="editPost(post)">Edit</a>
                    <a href="#" class="delete-btn" @click="deletePost(post.id)">Delete</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import PostForm from '../components/PostForm'
import PostService from '../PostService'
const postService = new PostService();

export default {
    name: "Home",
    components:{
        PostForm
    },
    data(){
        return {
            posts: [],
            postLimit: 3,
            editingPost: null
        }
    },
    methods: {
        addPost(post) {
            if(this.posts.find(p => p.id === post.id)){
                const index = this.posts.findIndex(p => p.id === post.id)
                this.posts.splice(index, 1, post)
            } else {
                this.posts.unshift(post)
            }
        },
        editPost(post) {
            this.editingPost = post
        },
        deletePost(id) {
            postService.deletePost(id).then(() => {
                this.posts = this.posts.filter(p => p.id !== id)
            }).catch(err => console.error(err))
        },
        setLimit() {
            postService.getPosts(this.postLimit)
                .then(res => this.posts = res.data)
                .catch(err => console.error(err))
        }
    },
    //mounted () : it will executed before creating the component. created () : it will executed after creating the component for render.
    created() {
        postService.getAllPosts()
            .then(res => {
                this.posts = res.data;
            }).catch(err => {
                console.error(err)
            })
    }
}
</script>

<style scoped>
.delete-btn {
    color: red !important
}
.card .card-content .card-title {
    margin-bottom: 0
}
.card .card-content p.timestamp {
    margin-bottom: 10px;
    color: #999
}
</style>