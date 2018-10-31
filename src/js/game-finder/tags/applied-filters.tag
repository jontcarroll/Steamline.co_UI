<applied-filters>

<!--      <div class="row ml-3 p-3">
        <div  each={ filter in appliedFilters }>
            <button class="mr-2 ml-2 btn btn-sm btn-pill { filter.include ? 'btn-success' : 'btn-danger' }">{ filter.title }</button>
        </div>
    </div>
  -->
<!--      <hr class="my-3"></hr>
  -->

<script>
this.app = this.opts.app;

this.appliedFilters = [
    {
        title: "Filter",
        include: false
    },
    {
        title: "Filter",
        include: false
    },
    {
        title: "Filter",
        include: true
    },
    {
        title: "Filter",
        include: false
    },
    {
        title: "Filter",
        include: false
    },
    {
        title: "Filter",
        include: true
    },
    {
        title: "Filter",
        include: false
    },
    {
        title: "Filter",
        include: true
    },
];

</script>

    <style>
        .applied-filters {
            position:fixed;
        }

    </style>

</applied-filters>