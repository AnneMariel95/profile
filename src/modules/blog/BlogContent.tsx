import type {FunctionComponent, ReactNode, ComponentProps} from 'react';
import {MDXRemote} from 'next-mdx-remote';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';
import BlockQuote from './BlockQuote';
import BlogAnchor from './BlogAnchor';
import BlogImg from './BlogImg';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components: ComponentProps<FunctionComponent> = {
  blockquote: BlockQuote,
  a: BlogAnchor,
  Img: BlogImg,
};

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
};

const BlogContent: FunctionComponent<Props> = ({source}) => {
  return <MDXRemote {...source} components={components} lazy={false} />;
};

export default BlogContent;
