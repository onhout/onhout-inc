from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel


class AdsIndexPage(Page):
    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super(AdsIndexPage, self).get_context(request)
        adspages = self.get_children().live().order_by('-first_published_at')
        context['adspages'] = adspages
        return context


# Create your models here.
class Ads(Page):
    date = models.DateField("Post date")

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        InlinePanel('gallery_images', label="Gallery images"),
    ]


class AdsImage(Orderable):
    page = ParentalKey(Ads, related_name='gallery_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]
