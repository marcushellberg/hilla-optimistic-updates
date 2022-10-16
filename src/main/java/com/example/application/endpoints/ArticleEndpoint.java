package com.example.application.endpoints;

import java.util.List;
import com.github.javafaker.Faker;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class ArticleEndpoint {
  private Faker faker = new Faker();

  static record Comment(int id, @Nonnull String username, @Nonnull String comment) {
  }
  static record Article(int id, @Nonnull String title,
      @Nonnull String author,
      @Nonnull String content,
      @Nonnull List<@Nonnull Comment> comments) {
  }

  public Article getArticleById(int id) {
    // It's all fake 😱
    return new Article(
        id,
        faker.backToTheFuture().quote(),
        faker.backToTheFuture().character(),
        String.join("\n\n", faker.lorem().paragraphs(4)),
        List.of());
  }

  public Comment addComment(int articleId, Comment comment) throws InterruptedException {
    // Pretend the save takes long, then return a simulated saved comment
    Thread.sleep(3000);
    return new Comment(faker.number().randomDigit(), comment.username,
        comment.comment + " (saved)");
  }

}
