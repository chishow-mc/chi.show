---
layout: default
permalink: /news/
---


{% for post in site.posts %}
<section class="section">
    <div class="container">
        <h1 class="title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
        <h2 class="subtitle">{{ post.date | date: "%Y/%m/%d" }}</h2>
        <p>{{ post.excerpt }}</p>
    </div>
</section>
{% endfor %}