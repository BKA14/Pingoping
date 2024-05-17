// likes.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likedPosts: Set<number> = new Set();

  constructor() {}

  likePost(postId: number) {
    this.likedPosts.add(postId);
  }

  isPostLiked(postId: number): boolean {
    return this.likedPosts.has(postId);
  }
}
