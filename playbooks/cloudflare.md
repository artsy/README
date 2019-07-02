---
title: Cloudflare
description: Working with Cloudflare
---

# Cloudflare

## Cloudflare setup

Cloudflare is configured via Terraform in the [Infrastructure repo](https://github.com/artsy/infrastructure/blob/master/terraform/staging/cloudflare.tf)

Manage new protected domains by making PRs to this configuration.

## Cloudflare DNS

To route requests through Cloudflare's firewall...

1) A [DNS record for artsy.net](https://dash.cloudflare.com/0373426be7be649ff052277fb5377c4f/artsy.net/dns) is created in Cloudflare's interface providing the CNAME of the ELB backing the given service.  You can obtain the DNS record of the ELB for a service by running `hokusai [staging|production] status` and looking at the `EXTERNAL-IP` column for the service record.

2) The DNS record [provided by Dyn](https://manage.dynect.net) is set to `*.artsy.net.cdn.cloudflare.net.` where `*` is the name of the record in Cloudflare's DNS settings.

3) The value `loadBalancerSourceRanges` is set on the [service ELB](https://github.com/artsy/force/blob/master/hokusai/production.yml#L143) restricting traffic coming from Cloudflare's edge nodes

With this setup, Cloudflare resolves requests to IPs of their edge nodes, then makes requests to our ELSb as origin servers.

## Routing requests around Cloudflare

In the case of Cloudflare edge node failures, we have the option to route requests to pass through the Cloudflare Firewall on its edge nodes.  In the DNS settings, if the domain's "Status" field with the Cloud icon on the right-hand column is orange and reports "DNS and HTTP Proxy (CDN)" then the Firewall is active and DNS requests for `*.artsy.net.cdn.cloudflare.net.` will resolve to Cloudflare edge node IPs, as is described above.

However, this can be toggled to a greyed-out icon that reports "DNS only" and will serve DNS requests for the domain `*.artsy.net.cdn.cloudflare.net.` as a CNAME for the origin server.  In this case, requests resolve to the ELB ips and do not apss through the Cloudflare Edge nodes.

Note that if you change to DNS only be sure to first remove the `loadBalancerSourceRanges` setting for the service ELB in config and run `hokusai [staging|production] update` to roll it out.
