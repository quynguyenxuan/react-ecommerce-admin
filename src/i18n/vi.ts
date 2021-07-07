import { TranslationMessages } from 'react-admin';

const vietnamMessages = require('ra-language-vietnamese').default;

const customFrenchMessages: TranslationMessages = {
  ...vietnamMessages,
  pos: {
    search: 'Search',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      monthly_revenue: 'Monthly Revenue',
      month_history: '30 Day Revenue History',
      new_orders: 'New Orders',
      pending_reviews: 'Pending Reviews',
      all_reviews: 'See all reviews',
      new_customers: 'New Customers',
      all_customers: 'See all customers',
      pending_orders: 'Pending Orders',
      order: {
        items:
          'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
      },
      welcome: {
        title: 'Welcome to the Web2Mobile dashboard',
        subtitle:
          "This is the admin of a web to mobile framework. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        ra_button: 'react-admin site',
        demo_button: 'Source for this demo',
      },
    },
    menu: {
      sales: 'Sales',
      catalog: 'Catalog',
      customers: 'Customers',
    },
  },
  resources: {
    customers: {
      name: 'Customer |||| Customers',
      fields: {
        commands: 'Orders',
        first_seen: 'First seen',
        groups: 'Segments',
        last_seen: 'Last seen',
        last_seen_gte: 'Visited Since',
        name: 'Name',
        total_spent: 'Total spent',
        password: 'Password',
        confirm_password: 'Confirm password',
        stateAbbr: 'State',
      },
      filters: {
        last_visited: 'Last visited',
        today: 'Today',
        this_week: 'This week',
        last_week: 'Last week',
        this_month: 'This month',
        last_month: 'Last month',
        earlier: 'Earlier',
        has_ordered: 'Has ordered',
        has_newsletter: 'Has newsletter',
        group: 'Segment',
      },
      fieldGroups: {
        identity: 'Identity',
        address: 'Address',
        stats: 'Stats',
        history: 'History',
        password: 'Password',
        change_password: 'Change Password',
      },
      page: {
        delete: 'Delete Customer',
      },
      errors: {
        password_mismatch:
          'The password confirmation is not the same as the password.',
      },
    },
    commands: {
      name: 'Order |||| Orders',
      amount: '1 order |||| %{smart_count} orders',
      title: 'Order %{reference}',
      fields: {
        basket: {
          delivery: 'Delivery',
          reference: 'Reference',
          quantity: 'Quantity',
          sum: 'Sum',
          tax_rate: 'Tax Rate',
          taxes: 'Tax',
          total: 'Total',
          unit_price: 'Unit Price',
        },
        address: 'Address',
        customer_id: 'Customer',
        date_gte: 'Passed Since',
        date_lte: 'Passed Before',
        nb_items: 'Nb Items',
        total_gte: 'Min amount',
        status: 'Status',
        type: 'Type',
        returned: 'Returned',
      },
      section: {
        order: 'Order',
        customer: 'Customer',
        shipping_address: 'Shipping Address',
        items: 'Items',
        total: 'Totals',
      },
    },
    invoices: {
      name: 'Invoice |||| Invoices',
      fields: {
        date: 'Invoice date',
        customer_id: 'Customer',
        command_id: 'Order',
        date_gte: 'Passed Since',
        date_lte: 'Passed Before',
        total_gte: 'Min amount',
        address: 'Address',
      },
    },
    products: {
      name: 'Product |||| Products',
      fields: {
        category_id: 'Category',
        height_gte: 'Min height',
        height_lte: 'Max height',
        height: 'Height',
        image: 'Image',
        price: 'Price',
        reference: 'Reference',
        sales: 'Sales',
        stock_lte: 'Low Stock',
        stock: 'Stock',
        thumbnail: 'Thumbnail',
        width_gte: 'Min width',
        width_lte: 'Max width',
        width: 'Width',
      },
      tabs: {
        image: 'Image',
        details: 'Details',
        description: 'Description',
        reviews: 'Reviews',
      },
      filters: {
        categories: 'Categories',
        stock: 'Stock',
        no_stock: 'Out of stock',
        low_stock: '1 - 9 items',
        average_stock: '10 - 49 items',
        enough_stock: '50 items & more',
        sales: 'Sales',
        best_sellers: 'Best sellers',
        average_sellers: 'Average',
        low_sellers: 'Low',
        never_sold: 'Never sold',
      },
    },
    categories: {
      name: 'Category |||| Categories',
      fields: {
        products: 'Products',
      },
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
    reviews: {
      name: 'Review |||| Reviews',
      amount: '1 review |||| %{smart_count} reviews',
      relative_to_Product: 'Review on Product',
      detail: 'Review detail',
      fields: {
        customer_id: 'Customer',
        command_id: 'Order',
        product_id: 'Product',
        date_gte: 'Posted since',
        date_lte: 'Posted before',
        date: 'Date',
        comment: 'Comment',
        rating: 'Rating',
      },
      action: {
        accept: 'Accept',
        reject: 'Reject',
      },
      notification: {
        approved_success: 'Review approved',
        approved_error: 'Error: Review not approved',
        rejected_success: 'Review rejected',
        rejected_error: 'Error: Review not rejected',
      },
    },
    segments: {
      name: 'Segment |||| Segments',
      fields: {
        customers: 'Customers',
        name: 'Name',
      },
      data: {
        compulsive: 'Compulsive',
        collector: 'Collector',
        ordered_once: 'Ordered once',
        regular: 'Regular',
        returns: 'Returns',
        reviewer: 'Reviewer',
      },
    },
    apps: {
      name: 'App |||| Apps',
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
    app_version: {
      name: 'App versions',
    },
    app_build: {
      name: 'App builds',
    },
    app_binary: {
      name: 'App binaryies',
    },
    app_screenshot: {
      name: 'App screenshots',
    },
    app_resource: {
      name: 'App resources',
    },
    app_provider: {
      name: 'App providers',
    },
    app_plugin: {
      name: 'App plugins',
    },
    tags: {
      name: 'Tag |||| Tags',
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
    collections: {
      name: 'Collection |||| Collections',
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
    links: {
      name: 'Links',
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
    app_links: {
      name: 'App links',
      tabs: {
        details: 'Details',
        description: 'Description',
      },
    },
  },
  undefined: 'undefined',
};

export default customFrenchMessages;
