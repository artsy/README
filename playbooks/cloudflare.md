---
title: Cloudflare
description: Working with Cloudflare
---

# Cloudflare

## Cloudflare setup

Cloudflare is configured via Terraform in the [Infrastructure repo](https://github.com/artsy/infrastructure/blob/master/terraform/staging/cloudflare.tf)

See [Enabling DDos Protection for a Subdomain via Cloudflare](https://www.notion.so/artsy/Cloudflare-80c2c0ed608644199e3eeb9da36f3b94#b8f87c4885374c019932f29b0ec318cb) for details on Cloudflare configuration

Manage new protected domains by making PRs to the Infrastructure repo.

Artsy engineers can find additional information in [Notion > Product Platform > Cloudflare](https://www.notion.so/artsy/Cloudflare-80c2c0ed608644199e3eeb9da36f3b94).

## Cloudflare DNS

To route requests through Cloudflare's firewall...

1) A [DNS record for artsy.net](https://dash.cloudflare.com/0373426be7be649ff052277fb5377c4f/artsy.net/dns) is created in Cloudflare's interface providing the CNAME of the ELB backing the given service.  You can obtain the DNS record of the ELB for a service by running `hokusai [staging|production] status` and looking at the `EXTERNAL-IP` column for the service record.

2) The value `loadBalancerSourceRanges` is set on the [service ELB](https://github.com/artsy/force/blob/master/hokusai/production.yml#L143) restricting traffic coming from Cloudflare's edge nodes

With this setup, Cloudflare resolves requests to IPs of their edge nodes, then makes requests to our ELBs as origin servers.

## Routing requests around Cloudflare

In the case of Cloudflare edge node failures, we have the option to route requests to pass through the Cloudflare firewall on its edge nodes.  In the DNS settings, if the domain's "Status" field with the *☁* icon on the right-hand column is orange and reports "DNS and HTTP Proxy (CDN)" then the firewall is active and DNS requests for `*.artsy.net.cdn.cloudflare.net.` will resolve to Cloudflare edge node IPs, as is described above.

However, this can be toggled to a greyed-out *☁* icon that reports "DNS only" and will serve DNS requests for the domain `*.artsy.net.cdn.cloudflare.net.` as a CNAME for the origin server.  In this case, requests resolve to the ELB's IP addresses and do not pass through the Cloudflare edge nodes.

Note that if you change DNS only be sure to first remove the `loadBalancerSourceRanges` setting for the service ELB in config and run `hokusai [staging|production] update` to roll it out.
