import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';
import { Comment } from 'src/app/interface/Comment';
import { CommentService } from 'src/app/services/CommentService.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product!: IProduct;
  comments: Comment[] = [];
  newComment: Comment = { id: 0, content: '', createdAt: '' };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
      }, error => console.log(error.message))
    })
  }
  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newComment.content.trim() !== '') {
      this.commentService.addComment(this.newComment).subscribe(() => {
        this.loadComments();
        this.newComment = { id: 0, content: '', createdAt: '' };
      });
    }
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.loadComments();
    });
  }
}


