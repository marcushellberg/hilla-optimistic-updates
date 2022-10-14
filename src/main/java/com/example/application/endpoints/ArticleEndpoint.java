package com.example.application.endpoints;

import java.util.List;
import com.github.javafaker.Faker;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class ArticleEndpoint {
  private Faker faker = new Faker();

  static record Comment(int id, String username, String comment) {
  }
  static record Article(int id, String title, String author, String content,
      List<Comment> comments) {
  }

  public Article getArticleById(int id) {
    // It's all fake 😱
    return new Article(
        id,
        faker.backToTheFuture().quote(),
        faker.backToTheFuture().character(),
        String.join("\n\n", faker.lorem().paragraphs(6)),
        List.of());
  }

  public Comment addComment(int articleId, Comment comment) {
    // Also fake 😎
    return new Comment(faker.number().randomDigit(), comment.username, comment.commment);
  }

}
