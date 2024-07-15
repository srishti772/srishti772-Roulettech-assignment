from django.db import models

class Recipe(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    prep_time = models.TextField()
    cook_time = models.TextField()
    total_time = models.TextField()
    servings = models.TextField()
    # JSONField for ingredients
    ingredients = models.JSONField(default=list)
    # JSONField for steps
    steps = models.JSONField(default=list)

    def __str__(self):
        return self.title