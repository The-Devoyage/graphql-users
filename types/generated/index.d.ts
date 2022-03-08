import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@the-devoyage/micro-auth-helpers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectID: any;
  _Any: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  email: Scalars['String'];
  loginUser?: Maybe<LoginUserResponse>;
  users?: Maybe<GetUsersResponse>;
};


export type AccountLoginUserArgs = {
  loginUserInput?: InputMaybe<LoginUserInput>;
};


export type AccountUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['String'];
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

export type BooleanArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type CreateUserInput = {
  account?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img?: InputMaybe<Scalars['ID']>;
  role?: InputMaybe<Scalars['Int']>;
};

export type DeleteUserInput = {
  _id: Scalars['ObjectID'];
};

export type FilterConfig = {
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  pagination?: InputMaybe<Pagination>;
};

export type GetUsersInput = {
  _id?: InputMaybe<StringFieldFilter>;
  account?: InputMaybe<StringArrayFilter>;
  config?: InputMaybe<FilterConfig>;
  created_by?: InputMaybe<StringFieldFilter>;
  email?: InputMaybe<StringFieldFilter>;
  first_name?: InputMaybe<StringFieldFilter>;
  image?: InputMaybe<StringFieldFilter>;
  last_name?: InputMaybe<StringFieldFilter>;
  phone?: InputMaybe<StringFieldFilter>;
  role?: InputMaybe<IntFieldFilter>;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data?: Maybe<Array<Maybe<User>>>;
  stats?: Maybe<Stats>;
};

export type IntArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type LoginUserCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  _id: Scalars['ObjectID'];
  credentials?: InputMaybe<LoginUserCredentialsInput>;
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  token: Scalars['String'];
  user: User;
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: User;
  loginUser: LoginUserResponse;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  deleteUserInput: DeleteUserInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getUsers: GetUsersResponse;
  me: User;
};


export type QueryGetUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type StringArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  string: Array<Scalars['String']>;
};

export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type UpdateUserInput = {
  _id: Scalars['ObjectID'];
  account?: InputMaybe<Scalars['ObjectID']>;
  address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img?: InputMaybe<Scalars['ObjectID']>;
  role?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
  about?: Maybe<Scalars['String']>;
  account: Account;
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  created_by?: Maybe<User>;
  email: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  role: Scalars['Int'];
  stripe_connected_account_id?: Maybe<Scalars['String']>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteUserInput: DeleteUserInput;
  FilterConfig: FilterConfig;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: ResolverTypeWrapper<GetUsersResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  LoginUserCredentialsInput: LoginUserCredentialsInput;
  LoginUserInput: LoginUserInput;
  LoginUserResponse: ResolverTypeWrapper<LoginUserResponse>;
  Media: ResolverTypeWrapper<Media>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'] | ResolversTypes['Media'] | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  DeleteUserInput: DeleteUserInput;
  FilterConfig: FilterConfig;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: GetUsersResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  LoginUserCredentialsInput: LoginUserCredentialsInput;
  LoginUserInput: LoginUserInput;
  LoginUserResponse: LoginUserResponse;
  Media: Media;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Query: {};
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  UpdateUserInput: UpdateUserInput;
  User: User;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'] | ResolversParentTypes['Media'] | ResolversParentTypes['User'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  loginUser?: Resolver<Maybe<ResolversTypes['LoginUserResponse']>, ParentType, ContextType, RequireFields<AccountLoginUserArgs, never>>;
  users?: Resolver<Maybe<ResolversTypes['GetUsersResponse']>, ParentType, ContextType, RequireFields<AccountUsersArgs, 'getUsersInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetUsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUsersResponse'] = ResolversParentTypes['GetUsersResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginUserResponse'] = ResolversParentTypes['LoginUserResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'deleteUserInput'>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'loginUserInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getUsers?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'getUsersInput'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stripe_connected_account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stripe_customer_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account' | 'Media' | 'User', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetUsersResponse?: GetUsersResponseResolvers<ContextType>;
  LoginUserResponse?: LoginUserResponseResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
