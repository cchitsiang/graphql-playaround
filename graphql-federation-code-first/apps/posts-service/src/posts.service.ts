import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  posts: Post[] = [];
    constructor(){
        const post = new Post({});
        post.id = 1;
        post.title ='a';
        post.userId = 1;
        this.posts.push({...post});

        post.id = 2;
        post.title ='b';
        post.userId = 1;
        this.posts.push({...post});

        post.id = 3;
        post.title ='c';
        post.userId = 1;
        this.posts.push({...post});

        post.id = 4;
        post.title ='c';
        post.userId = 1;
        this.posts.push({...post});
    }

    async findById(id: number): Promise<Post>{
      return Promise.resolve(this.posts.find(p => p.id === id));
    }
}
